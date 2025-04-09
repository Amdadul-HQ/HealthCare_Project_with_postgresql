import { Request, Response } from "express";
import { AdminServices } from "./admin.service"


const getAdmins = async(req:Request,res:Response) => {
    console.log(req.query.searchTerm);
    try{
        const result = await AdminServices.getAdminsFromDB(req.query.searchTerm as string)
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