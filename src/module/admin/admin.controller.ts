import { Request, Response } from "express";
import { AdminServices } from "./admin.service"
import pick from "../../app/shared/pick";



const getAdmins = async(req:Request,res:Response) => {

    try{

        const filter = pick(req.query,['name','email','searchTerm','contactNumber'])

        const result = await AdminServices.getAdminsFromDB(filter)
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