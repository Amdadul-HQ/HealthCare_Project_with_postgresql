import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const getAdminsFromDB = async(searchTerm:string) => {

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
            OR:['name','email'].map(field =>({
                [field]:{
                    contains:searchTerm,
                    mode:'insensitive'
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