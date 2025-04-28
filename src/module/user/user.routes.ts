import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../app/middleWares/auth";
import { fileUploder } from "../../app/helper/fileUploader";
import { userValidation } from "./user.validation";
import {UserRole} from "@prisma/client"

const router = express.Router();

router.get("/",
    auth(UserRole.ADMIN,UserRole.ADMIN),
    userController.getUsers
)

router.get(
    '/me',
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN,UserRole.DOCTOR,UserRole.PAIENT,UserRole.SUPER_ADMIN),
    userController.getMyProfile
)

router.post("/",
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    fileUploder.upload.single('file'), 
    (req:Request,res:Response,next:NextFunction) => {
       req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))
       return userController.createAdmin(req,res,next)
    },
)

router.post("/create-doctor",
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    fileUploder.upload.single('file'), 
    (req:Request,res:Response,next:NextFunction) => {
       req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data))
       return userController.createDoctor(req,res,next)
    },
)

router.post(
    "/create-patient",
    fileUploder.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createPatient.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    }
);

router.patch(
    '/:id/status',
    userController.changeProfileStatus
)


router.patch(
    "/update-my-profile",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PAIENT),
    fileUploder.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        return userController.updateMyProfile(req, res, next)
    }
);


export const UserRoutes = router;