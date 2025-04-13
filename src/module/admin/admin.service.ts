import { Prisma  } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../app/helper/paginationHelper";
import prisma from "../../app/shared/prisma";




const getAdminsFromDB = async(params:any,options:any) => {

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
                    equals:filterData[key]
                }
            }))
        })
    }


    const whereConditions:Prisma.AdminWhereInput = {AND:andCondition}
    
    // formula
    // page -1 * limite


    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip:(Number(page) -1) * Number(limite),
        take:Number(limite),
        orderBy:(sortBy && sortOrder) ? {[sortBy]:sortOrder} : {createdAt:'asc'}
    })
    return {
        page,
        limite,
        result
    }
}

export const AdminServices = {
    getAdminsFromDB
}