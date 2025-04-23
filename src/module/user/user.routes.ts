import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { Jwthelper } from "../../app/helper/jwtHelper";
import config from "../../app/config";


const auth = (...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction) => {
        try{
            const token = req.headers.authorization;

            if(!token){
                throw new Error("You are not authorize!!")
            }

            const varifiedUser = Jwthelper.verifyToken(token as  string,config.jwt.jwt_scret as string)
            
            if(roles.length && !(roles.includes(varifiedUser.role))){
                throw new Error("You are not authorize!!")
            }

            next()
        }
        catch(error){
            next(error)
        }
    }
}

const router = express.Router();

router.post("/",userController.createAdmin)

export const UserRoutes = router;