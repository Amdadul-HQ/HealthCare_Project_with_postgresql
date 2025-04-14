import { NextFunction, Request, Response } from "express";
import { useServices } from "./user.service";

const createAdmin = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const result = await useServices.createAdminInToDB(req.body);
        res.status(200).json({
            success:true,
            message:'Admin Created Successfully',
            data:result
        })
    }
    catch(error:any){
        next(error)
    }

}


export const userController = {
    createAdmin
}