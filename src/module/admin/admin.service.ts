import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const getAdminsFromDB = async(searchTerm:string) => {
    if(searchTerm){
        const result = await prisma.admin.findMany({
            where:{
                // serch by name
                // name:{
                //     contains:searchTerm,
                //     mode:"insensitive"
                // }
                OR:[
                    {
                        name:{
                            contains:searchTerm,
                            mode:'insensitive'
                        },
                    },
                    {
                        email:{
                            contains:searchTerm,
                            mode:'insensitive'
                        }
                    }
                ]
            }
        })
        return result
    }
    const result = await prisma.admin.findMany()
    return result;
}

export const AdminServices = {
    getAdminsFromDB
}