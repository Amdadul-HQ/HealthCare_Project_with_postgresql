import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const getAdminsFromDB = async(searchTerm:string) => {
    const result = await prisma.admin.findMany({
        where:{
            name:{
                contains:searchTerm
            }
        }
    })
    return result
}

export const AdminServices = {
    getAdminsFromDB
}