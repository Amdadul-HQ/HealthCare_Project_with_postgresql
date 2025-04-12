import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";

const prisma = new PrismaClient()


const getAdminsFromDB = async(params:any,options:any) => {

    const {page,limite} = options

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
        skip:(parseInt(page) -1) * parseInt(limite),
        take:parseInt(limite),
        orderBy:{
            createdAt:"desc"
        }
    })
    return result
}

export const AdminServices = {
    getAdminsFromDB
}