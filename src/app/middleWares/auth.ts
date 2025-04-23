import { NextFunction, Request, Response } from "express";
import { Jwthelper } from "../helper/jwtHelper";
import config from "../config";

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


export default auth;