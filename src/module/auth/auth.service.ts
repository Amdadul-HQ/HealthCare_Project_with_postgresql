import prisma from "../../app/shared/prisma";
import bcrypt from 'bcryptjs';

const loginUser = async(payload:{email:string,password:string}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email
        }
    })

    const isCorrectPassword :boolean = await bcrypt.compare(payload.password,userData.password);

    // if()

    return userData
}

export const AuthServices = {
    loginUser
}