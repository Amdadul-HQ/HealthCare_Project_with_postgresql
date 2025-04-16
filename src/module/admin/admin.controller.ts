import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.service"
import pick from "../../app/shared/pick";
import { adminFilterableFields, paginationOptions } from "./admin.constant";
import { sendResponse } from "../../app/shared/sendResponse";
import  httpStatus  from "http-status";

const catchAsync = (fn:RequestHandler) => {
    return async(req:Request,res:Response,next:NextFunction)=> {
        try{
            await fn(req,res,next)
        }
        catch(error){
            next(error)
        }
    }
}

const getAdmins:RequestHandler = catchAsync(async(req,res,next) => {

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
    }
)

const getAdminById = catchAsync(async(req:Request,res:Response,next:NextFunction)=> {

    const {id} = req.params

    const result = await AdminServices.getAdminByIDFromDB(id)

        sendResponse(res,
            {
                statusCode:httpStatus.OK,
                success:true,
                message:'Admin Data Fetched By Id Successfully',
                data:result
            }
        )
    }
)

const updateAdminData = catchAsync(async (req:Request,res:Response,next:NextFunction) => {

        const {id} = req.params

        const updatedData = req.body

        const result = await AdminServices.updateInToDB(id,updatedData)

        sendResponse(res,
            {
                statusCode:httpStatus.OK,
                success:true,
                message:'Admin Data Updated Successfully',
                data:result
            }
        )
    }
)

const deleteAdmin = catchAsync(async (req:Request,res:Response,next:NextFunction) => {

        const {id} = req.params

        const result = await AdminServices.deleteAdminFromDB(id)

        sendResponse(res,
            {
                statusCode:httpStatus.OK,
                success:true,
                message:'Admin Data Deleted Successfully',
                data:result
            }
        )
    }
)

const softDeletedAdmin = catchAsync(async (req:Request,res:Response,next:NextFunction) => {

        const {id} = req.params

        const result = await AdminServices.softDeletedAdminFromDB(id)

        sendResponse(res,
            {
                statusCode:httpStatus.OK,
                success:true,
                message:'Admin Soft Deleted Successfully',
                data:result
            }
        )
    }
)



export const AdminController = {
    getAdmins,
    getAdminById,
    updateAdminData,
    deleteAdmin,
    softDeletedAdmin
}