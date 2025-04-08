import {PrismaClient, UserRole} from "@prisma/client"

const prisma = new PrismaClient();

const createAdminInToDB = async (data) =>{
    const userData = {
        email:data.admin.email,
        password:data.password,
        role: UserRole.ADMIN,
    }

    const result = await prisma.$transaction(async(tx)=>{
        const createdUserData = await tx.user.create({
            data:userData
        })

        const createdAdminData = await tx.admin.create({
            data:data.admin
        })

        return {createdUserData,createdAdminData}
    })

    return result;
}


export const useServices = {
    createAdminInToDB
}