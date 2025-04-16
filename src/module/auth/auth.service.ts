import { Jwthelper } from "../../app/helper/jwtHelper";
import prisma from "../../app/shared/prisma";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';




const loginUser = async(payload:{email:string,password:string}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email
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
        "AccessToken",
        '5m'
    )

    const refreshToken = Jwthelper.generateToken(
        {
            email:userData.email,
            role:userData.role
        },
        "RefreshToken",
        '30d'
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
        where:decodedData?.email
    });

    if(!isUserExist){
        throw new Error("User Not exist")
    }

    const accessToken = Jwthelper.generateToken(
        {
            email:isUserExist.email,
            role:isUserExist.role
        },
        "AccessToken",
        '5m'
    )

    return {accessToken,needPasswordChange:isUserExist.needPasswordChange}
}

export const AuthServices = {
    loginUser,
    refreshToken
}