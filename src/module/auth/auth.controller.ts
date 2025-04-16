import { Request, Response } from "express";
import { catchAsync } from "../../app/helper/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../app/shared/sendResponse";
import  httpStatus  from "http-status";

const loginUser = catchAsync(async(req:Request,res:Response) => {

    const result = await AuthServices.loginUser(req.body);

    const {refreshToken,accessToken,needPasswordChange} = result;

    res.cookie('refreshToken',refreshToken,{
        secure:false,
        httpOnly:true
    })

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"login successfully",
        data:{
            accessToken,
            needPasswordChange
        }
    })

})

export const AuthController = {
    loginUser
}