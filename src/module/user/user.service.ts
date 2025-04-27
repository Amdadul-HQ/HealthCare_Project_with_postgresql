
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '../../app/shared/prisma';
import { fileUploder } from '../../app/helper/fileUploader';


const createAdminInToDB = async (req:any) =>{
    const data = req?.body?.data
    const file = req?.file 
    if(file){
        const uploadToCloudinary = await fileUploder.uploadToCloudinary(file)
        
    }
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