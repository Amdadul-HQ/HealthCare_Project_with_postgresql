import { Request, Response } from "express";
import { AdminServices } from "./admin.service"

const pick = (obj,keys) => {
    const finalObject = {}
    for(const key of keys){
        if(obj && Object.hasOwnProperty.call(obj,key)){
            finalObject[key] = obj[key]
        }
    }
    return finalObject
}

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