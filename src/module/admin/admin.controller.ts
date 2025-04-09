import { Request, Response } from "express";
import { AdminServices } from "./admin.service"


const getAdmins = async(req:Request,res:Response) => {

    try{
        const result = await AdminServices.getAdminsFromDB(req.query)
            res.status(200).json({
                success:true,
                message:'Admin Data Fetched Successfully',
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


export const AdminController = {
    getAdmins
}