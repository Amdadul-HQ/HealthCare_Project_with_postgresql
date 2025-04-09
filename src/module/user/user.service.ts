
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const createAdminInToDB = async (data:any) =>{
    const hashedPassword:string = await bcrypt.hash(data.password,12)
    const userData = {
        email:data.admin.email,
        password:hashedPassword,
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