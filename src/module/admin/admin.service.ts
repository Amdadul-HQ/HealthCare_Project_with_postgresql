import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const getAdminsFromDB = async(params:any) => {

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

    const adminSearchAbleFields = ['name','email']

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
    
    const result = await prisma.admin.findMany({
        where: whereConditions
    })
    return result
}

export const AdminServices = {
    getAdminsFromDB
}