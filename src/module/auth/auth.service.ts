import { UserStatus } from "@prisma/client";
import { Jwthelper } from "../../app/helper/jwtHelper";
import prisma from "../../app/shared/prisma";
import bcrypt from 'bcryptjs';
import config from "../../app/config";
import ApiError from "../../app/error/ApiError";
import httpStatus from 'http-status'



const loginUser = async(payload:{email:string,password:string}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email,
            status:UserStatus.ACTIVE
        }
    })

    const isCorrectPassword :boolean = await bcrypt.compare(payload.password,userData.password);

    if(!isCorrectPassword){
        throw new Error("Incorret Password")
    }

    const accessToken = Jwthelper.generateToken(
        {
            email:userData.email,
            role:userData.role
        },
        config.jwt.jwt_scret as string,
        config.jwt.expires_in as string,
    )

    const refreshToken = Jwthelper.generateToken(
        {
            email:userData.email,
            role:userData.role
        },
        config.jwt.refresh_token_secret as string,
        config.jwt.refresh_token_expires_in as string
    )

    return {
        accessToken,
        refreshToken,
        needPasswordChange:userData.needPasswordChange
    }
}


const refreshToken = async(token:string) => {
    let decodedData;
    try{

        decodedData = Jwthelper.verifyToken(token,'RefreshToken')
        
    }
    catch(error){
        throw new Error("you are not authorized")
    }

    const isUserExist = await prisma.user.findUniqueOrThrow({
        where:{email:decodedData?.email,status:UserStatus.ACTIVE}
        
    });

    if(!isUserExist){
        throw new Error("User Not exist")
    }

    const accessToken = Jwthelper.generateToken(
        {
            email:isUserExist.email,
            role:isUserExist.role
        },
        config.jwt.jwt_scret as string,
        config.jwt.expires_in as string
    )

    return {accessToken,needPasswordChange:isUserExist.needPasswordChange}
}


const changePasswordInToDB = async(user:any,payload:{newPassword:string,password:string}) => {
    
    const userData = await prisma.user.findUniqueOrThrow({
    
        where:{
    
            email:user.email,

            status:UserStatus.ACTIVE,
    
        }
    }
);

    const isCorrectPassword :boolean = await bcrypt.compare(payload.password,userData.password);

    if(!isCorrectPassword){
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION,"Incorret Password")
    }

    const hashedPassword:string = await bcrypt.hash(payload.newPassword,12)

    await prisma.user.update({
        
        where:{
            
            email:userData.email
        
        },
        
        data:{
            
            password:hashedPassword,

            needPasswordChange:false

        }
    }
)
    return {message:"password change successfully"}
}

export const AuthServices = {
    loginUser,
    refreshToken,
    changePasswordInToDB
}