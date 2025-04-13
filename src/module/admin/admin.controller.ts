import { Request, Response } from "express";
import { AdminServices } from "./admin.service"
import pick from "../../app/shared/pick";
import { adminFilterableFields, paginationOptions } from "./admin.constant";



const getAdmins = async(req:Request,res:Response) => {

    try{

        const filter = pick(req.query,adminFilterableFields)
        const options = pick(req.query,paginationOptions)


        const result = await AdminServices.getAdminsFromDB(filter,options)
            res.status(200).json({
                success:true,
                message:'Admin Data Fetched Successfully',
                meta:result.meta,
                data:result.data
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

const getAdminById = async(req:Request,res:Response)=> {
    try{
        const {id} = req.params
        const result = await AdminServices.getAdminByIDFromDB(id)
        res.status(200).json({
            success:true,
            message:'Admin Data Fetched By Id Successfully',
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

const updateAdminData = async (req:Request,res:Response) => {
    try{
        const {id} = req.params
        const updatedData = req.body
        const result = await AdminServices.updateInToDB(id,updatedData)
        res.status(200).json({
            success:true,
            message:'Admin Data Updated Successfully',
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
    getAdmins,
    getAdminById,
    updateAdminData
}