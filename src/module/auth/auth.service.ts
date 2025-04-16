import { Jwthelper } from "../../app/helper/jwtHelper";
import prisma from "../../app/shared/prisma";
import bcrypt from 'bcryptjs';





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

}

export const AuthServices = {
    loginUser,
    refreshToken
}