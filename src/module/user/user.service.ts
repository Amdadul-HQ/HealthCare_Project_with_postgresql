
import { Patient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '../../app/shared/prisma';
import { fileUploder } from '../../app/helper/fileUploader';
import { IFile } from '../../app/interface/file';


const createAdminInToDB = async (req:any) =>{
    // const data = req?.body?.data
    const file = req?.file 
    if(file){
        const uploadToCloudinary  = await fileUploder.uploadToCloudinary(file)
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url as string

    }
    const hashedPassword:string = await bcrypt.hash(req.body.password,12)
    const userData = {
        email:req.body.admin.email,
        password:hashedPassword,
        role: UserRole.ADMIN,
    }

    const result = await prisma.$transaction(async(tx)=>{
        const createdUserData = await tx.user.create({
            data:userData
        })

        const createdAdminData = await tx.admin.create({
            data:req.body.admin
        })

        return {createdUserData,createdAdminData}
    })

    return result;
}

const createDoctorInToDB = async (req:any) =>{
    // const data = req?.body?.data
    const file = req?.file 
    if(file){
        const uploadToCloudinary  = await fileUploder.uploadToCloudinary(file)
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url as string

    }
    const hashedPassword:string = await bcrypt.hash(req.body.password,12)
    const userData = {
        email:req.body.doctor.email,
        password:hashedPassword,
        role: UserRole.DOCTOR,
    }

    const result = await prisma.$transaction(async(tx)=>{
        const createdUserData = await tx.user.create({
            data:userData
        })

        const createdDoctorData = await tx.doctor.create({
            data:req.body.doctor
        })

        return {createdUserData,createdDoctorData}
    })

    return result;
}

const createPatientInToDB = async (req: any): Promise<Patient> => {
    const file = req.file as IFile;

    if (file) {
        const uploadedProfileImage = await fileUploder.uploadToCloudinary(file);
        req.body.patient.profilePhoto = uploadedProfileImage?.secure_url;
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
        role: UserRole.PAIENT
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdPatientData = await transactionClient.patient.create({
            data: req.body.patient
        });

        return createdPatientData;
    });

    return result;
};


export const useServices = {
    createAdminInToDB,
    createDoctorInToDB,
    createPatientInToDB
}