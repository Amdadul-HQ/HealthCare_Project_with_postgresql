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

const refreshToken = catchAsync(async(req:Request,res:Response) => {

    const {refreshToken} = req.cookies
    
    const result = await AuthServices.refreshToken(refreshToken)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Refresh token set successfully",
        data:result
    })

})

const changePassword = catchAsync(async(req:Request & {user?:any},res:Response)=>{

    const user = req.user

    const result = await AuthServices.changePasswordInToDB(user,req.body)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Password Change Successfully",
        data:result
    })
})

const forgotPassword = catchAsync(async(req,res)=>{

    const result = await AuthServices.forgotPasswordInToDB(req.body)
    
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"",
        data:result
    })
})

export const AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword
}