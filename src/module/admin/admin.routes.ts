import express  from 'express';
import { AdminController } from './admin.controller';
import { z } from 'zod'
import { validateRequest } from '../../app/middleWares/validationRequest';
import { adminValidationSchema } from './admin.validation';
import auth from '../../app/middleWares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();



router.get('/',
    auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),
    AdminController.getAdmins)

router.get('/:id',
    auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),
    AdminController.getAdminById)

router.patch('/:id',
    auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),
    validateRequest(adminValidationSchema.update),
    AdminController.updateAdminData)

router.delete('/:id',
    auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),
    AdminController.deleteAdmin)

router.delete('/soft/:id',
    auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),
    AdminController.softDeletedAdmin);

export const AdminRoutes = router