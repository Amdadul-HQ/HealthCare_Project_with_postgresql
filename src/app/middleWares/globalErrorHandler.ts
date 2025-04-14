import { ErrorRequestHandler, Request, Response } from "express";
import httpStatus from 'http-status'

const globalErrorHandler = (err:ErrorRequestHandler,req:Request,res:Response)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:err.name || "Something went wrong",
        error:err
    })
}

export default globalErrorHandler