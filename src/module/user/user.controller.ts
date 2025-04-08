import { Request, Response } from "express";
import { useServices } from "./user.service";

const createAdmin = async (req:Request,res:Response) => {
    console.log(req.body);
   const result = await useServices.createAdminInToDB();
   res.send(result)
}


export const userController = {
    createAdmin
}