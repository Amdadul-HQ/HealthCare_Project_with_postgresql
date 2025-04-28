
import { Patient, Prisma, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '../../app/shared/prisma';
import { fileUploder } from '../../app/helper/fileUploader';
import { IPaginationOptions } from '../../app/interface/pagination';
import { paginationHelper } from '../../app/helper/paginationHelper';
import { userSearchAbleFields } from './user.constant';
import { IAuthUser } from '../../app/interface/common';
import { Request } from 'express';
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

const getAllFromDB = async(params:any,options:IPaginationOptions) => {

    const {page,limite,sortBy,sortOrder} = paginationHelper.calculatePagination(options)

    const {searchTerm,...filterData} = params

    const andCondition :Prisma.UserWhereInput[] = [];

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
            OR:userSearchAbleFields.map(field =>({
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
                    equals:(filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions:Prisma.UserWhereInput = andCondition.length > 0 ?  {AND:andCondition} : {}
    // formula
    // page -1 * limite


    const result = await prisma.user.findMany({
        where: whereConditions,
        skip:(Number(page) -1) * Number(limite),
        take:Number(limite),
        orderBy:(sortBy && sortOrder) ? {[sortBy]:sortOrder} : {createdAt:'asc'},
        select:{
            id:true,
            email:true,
            role:true,
            needPasswordChange:true,
            status:true,
            createdAt:true,
            updatedAt:true,
            admin:true,
            patient:true,
            doctor:true
        },
        // include:{
        //     admin:true,
        //     patient:true,
        //     doctor:true
        // }
    })

    const total = await prisma.user.count({
        where:whereConditions
    })

    return {
        meta:{
            page,
            limite,
            total
        },
        data:result
    }
}

const changeProfileStatusInToDB = async (id: string, status: UserRole) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            id
        },
        select:{
            id:true,
            email:true,
            needPasswordChange:true,
            role:true,
            status:true
        }
    });

    const updateUserStatus = await prisma.user.update({
        where: {
            id
        },
        data: status
    });

    return updateUserStatus;
}

const getMyProfileFromDB = async (user:any) => {
    
    const userInFo = await prisma.user.findUniqueOrThrow({
        where:{
            email:user.email
        }
    });

    let profileInFo;

    if(userInFo.role === UserRole.SUPER_ADMIN){
        profileInFo = await prisma.admin.findUniqueOrThrow({
            where:{
                email:userInFo.email
            }
        });
    }

    else if(userInFo.role === UserRole.ADMIN){
        profileInFo = await prisma.admin.findUniqueOrThrow({
            where:{
                email:userInFo.email
            }
        });
    }
    else if(userInFo.role === UserRole.DOCTOR){
            profileInFo = await prisma.doctor.findUniqueOrThrow({
                where:{
                    email:userInFo.email
                }
            });
        }
    else if(userInFo.role === UserRole.PAIENT){
            profileInFo = await prisma.patient.findUniqueOrThrow({
                where:{
                    email:userInFo.email
                }
            });
    }
    return {...userInFo,...profileInFo};
}

const updateMyProfileInToDB = async(user:IAuthUser,req:Request) => {
     const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    });

    const file = req.file as IFile;
    if (file) {
        const uploadToCloudinary = await fileUploder.uploadToCloudinary(file);
        req.body.profilePhoto = uploadToCloudinary?.secure_url;
    }

    let profileInfo;

    if (userInfo.role === UserRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === UserRole.ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === UserRole.DOCTOR) {
        profileInfo = await prisma.doctor.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === UserRole.PAIENT) {
        profileInfo = await prisma.patient.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }

    return { ...profileInfo };
}


export const useServices = {
    getAllFromDB,
    createAdminInToDB,
    getMyProfileFromDB,
    createDoctorInToDB,
    createPatientInToDB,
    changeProfileStatusInToDB,
    updateMyProfileInToDB
}