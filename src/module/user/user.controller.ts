import { NextFunction, Request, RequestHandler, Response } from "express";
import { useServices } from "./user.service";
import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../app/shared/pick";
import { userFilterableFields } from "./user.constant";
import { paginationOptions } from "../admin/admin.constant";

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await useServices.createAdminInToDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await useServices.createDoctorInToDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

const createPatient = catchAsync(async (req: Request, res: Response) => {

    const result = await useServices.createPatientInToDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient Created successfuly!",
        data: result
    })
});

const getUsers:RequestHandler = catchAsync(async(req,res,next) => {

    const filter = pick(req.query,userFilterableFields)

    const options = pick(req.query,paginationOptions)

    const result = await useServices.getAllFromDB(filter,options)
        sendResponse(res,
            {
                statusCode:httpStatus.OK,
                success:true,
                message:'User Data Fetched Successfully',
                meta:result.meta,
                data:result.data
            }
        )
    }
)

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await useServices.changeProfileStatusInToDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});


const getMyProfile = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await useServices.getMyProfileFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fetched!",
        data: result
    })
});

export const userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getUsers,
    changeProfileStatus,
    getMyProfile
}