import { Admin, Prisma, UserStatus  } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../app/helper/paginationHelper";
import prisma from "../../app/shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../app/interface/pagination";




const getAdminsFromDB = async(params:IAdminFilterRequest,options:IPaginationOptions) => {

    const {page,limite,sortBy,sortOrder} = paginationHelper.calculatePagination(options)

    const {searchTerm,...filterData} = params

    const andCondition :Prisma.AdminWhereInput[] = [];

    // [
    //     {
    //         name:{
    //             contains:searchTerm,
    //             mode:'insensitive'
    //         },
    //     },
    //     {
    //         email:{
    //             contains:searchTerm,
    //             mode:'insensitive'
    //         }
    //     }
    // ]


    if(searchTerm){

        andCondition.push({
            OR:adminSearchAbleFields.map(field =>({
                [field]:{
                    contains:searchTerm,
                    mode:'insensitive'
                }
            }))
        })

        
    }

    if(Object.keys(filterData).length>0){
        andCondition.push({
            AND:Object.keys(filterData).map(key => ({
                [key]:{
                    equals:(filterData as any)[key]
                }
            }))
        })
    }

    andCondition.push({
        isDeleted:false
    })


    const whereConditions:Prisma.AdminWhereInput = {AND:andCondition}
    
    // formula
    // page -1 * limite


    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip:(Number(page) -1) * Number(limite),
        take:Number(limite),
        orderBy:(sortBy && sortOrder) ? {[sortBy]:sortOrder} : {createdAt:'asc'}
    })

    const total = await prisma.admin.count({
        where:whereConditions
    })

    return {
        meta:{
            page,
            limite,
            total
        },
        data:result
    }
}


const getAdminByIDFromDB = async(id:string) :Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where:{
            id,
            isDeleted:false
        }
    })
    return result;
}

const updateInToDB = async(id:string,updateData:Partial<Admin>)=> {
     
    await prisma.admin.findUniqueOrThrow({
        where:{
            id,
            isDeleted:false
        }
    })
    const result = await prisma.admin.update({
        where:{
            id
        },
        data:updateData
    })
    return result
}

const deleteAdminFromDB = async (id:string) :Promise<Admin | null>=> {

    await prisma.admin.findUniqueOrThrow({
        where:{
            id
        }
    })

    const result = await prisma.$transaction(async(tx)=>{
        const adminDeletedData = await tx.admin.delete({
            where:{
                id
            }
        })
        const userDeletedDate = await tx.user.delete({
            where:{
                email:adminDeletedData.email
            }
        })
        return {adminDeletedData}
    })

    return result.adminDeletedData

}


const softDeletedAdminFromDB = async(id:string)=>{

    await prisma.admin.findUniqueOrThrow({
        where:{
            id,
            isDeleted:false
        }
    })

    const result = await prisma.$transaction(async(tx)=>{
        const adminDeletedData = await tx.admin.update({
            where:{
                id
            },
            data:{
                isDeleted:true
            }
        })
        const userDeletedDate = await tx.user.update({
            where:{
                email:adminDeletedData.email
            },
            data:{
                status:UserStatus.DELETED
            }
        })
        return {adminDeletedData,userDeletedDate}
    })

    return result


}


export const AdminServices = {
    getAdminsFromDB,
    getAdminByIDFromDB,
    updateInToDB,
    deleteAdminFromDB,
    softDeletedAdminFromDB
}