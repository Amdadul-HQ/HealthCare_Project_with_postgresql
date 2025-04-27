import { NextFunction, Request, Response } from "express";
import { useServices } from "./user.service";

const createAdmin = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const result = await useServices.createAdminInToDB(req);
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

const createDoctor = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const result = await useServices.createDoctorInToDB(req);
        res.status(200).json({
            success:true,
            message:'Doctor Created Successfully',
            data:result
        })
    }
    catch(error:any){
        next(error)
    }

}


export const userController = {
    createAdmin,
    createDoctor
}