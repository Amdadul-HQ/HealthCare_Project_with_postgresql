import { Request, Response } from "express";
import { useServices } from "./user.service";

const createAdmin = async (req:Request,res:Response) => {

   const result = await useServices.createAdminInToDB(req.body);
//    res.send(result)
   res.status(200).json({
    success:true,
    message:'Admin Created Successfully',
    data:result
   })
}


export const userController = {
    createAdmin
}