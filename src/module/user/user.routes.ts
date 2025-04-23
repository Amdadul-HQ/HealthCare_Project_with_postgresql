import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";


const auth = (...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction) => {

    }
}

const router = express.Router();

router.post("/",userController.createAdmin)

export const UserRoutes = router;