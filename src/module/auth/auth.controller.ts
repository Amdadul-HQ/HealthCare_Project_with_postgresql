import { Request, Response } from "express";
import { catchAsync } from "../../app/helper/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../app/shared/sendResponse";
import  httpStatus  from "http-status";

const loginUser = catchAsync(async(req:Request,res:Response) => {

    const result = await AuthServices.loginUser(req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"login successfully",
        data:result
    })

})

export const AuthController = {
    loginUser
}