import express, { NextFunction, Request, Response }  from 'express';
import { AdminController } from './admin.controller';
import { AnyZodObject, z } from 'zod'

const router = express.Router();

const update = z.object({
    body:z.object({
        name:z.string({}),
        contactNumber:z.string({})
    })
})

const validateRequest = (schema:AnyZodObject)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            await schema.parseAsync(req.body)
        
            next()
        }
        catch(error){
            next(error)
        }
    }
}

router.get('/',AdminController.getAdmins)

router.get('/:id',AdminController.getAdminById)

router.patch('/:id',AdminController.updateAdminData)

router.delete('/:id',AdminController.deleteAdmin)

router.delete('/soft/:id',
    validateRequest(update),
    AdminController.softDeletedAdmin);

export const AdminRoutes = router