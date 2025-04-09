import { Request, Response } from "express";
import { useServices } from "./user.service";

const createAdmin = async (req:Request,res:Response) => {

    try{
        const result = await useServices.createAdminInToDB(req.body);
        res.status(200).json({
            success:true,
            message:'Admin Created Successfully',
            data:result
        })
    }
    catch(error:any){
        res.status(500).json({
            success:false,
            message:error.name || "Something want wrong",
            error:error
        })
    }

}


export const userController = {
    createAdmin
}