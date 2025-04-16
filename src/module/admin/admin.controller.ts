import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.service"
import pick from "../../app/shared/pick";
import { adminFilterableFields, paginationOptions } from "./admin.constant";
import { sendResponse } from "../../app/shared/sendResponse";
import  httpStatus  from "http-status";


const getAdmins:RequestHandler = async(req,res,next) => {

    try{

        const filter = pick(req.query,adminFilterableFields)
        const options = pick(req.query,paginationOptions)


        const result = await AdminServices.getAdminsFromDB(filter,options)
            sendResponse(res,
                {
                    statusCode:httpStatus.OK,
                    success:true,
                    message:'Admin Data Fetched Successfully',
                    meta:result.meta,
                    data:result.data
                }
            )
            // res.status(200).json({
            //     success:true,
            //     message:'Admin Data Fetched Successfully',
            //     meta:result.meta,
            //     data:result.data
            // })
        }
        catch(error:any){
            next(error)
        }
}

const getAdminById = async(req:Request,res:Response,next:NextFunction)=> {
    try{
        const {id} = req.params
        const result = await AdminServices.getAdminByIDFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Admin Data Fetched By Id Successfully',
            data:result
        })
    }
    catch(error:any){
        next(error)
    }
}

const updateAdminData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {id} = req.params
        const updatedData = req.body
        const result = await AdminServices.updateInToDB(id,updatedData)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Admin Data Updated Successfully',
            data:result
        })
    }
    catch(error:any){
        next(error)
    }
}

const deleteAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {id} = req.params
        const result = await AdminServices.deleteAdminFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Admin Data Deleted Successfully',
            data:result
        })
    }
    catch(error:any){
        next(error)
    }
}

const softDeletedAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {id} = req.params
        const result = await AdminServices.softDeletedAdminFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Admin Soft Deleted Successfully',
            data:result
        })
    }
    catch(error:any){
        next(error)
    }
}



export const AdminController = {
    getAdmins,
    getAdminById,
    updateAdminData,
    deleteAdmin,
    softDeletedAdmin
}