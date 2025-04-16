import express,   from 'express';
import { AdminController } from './admin.controller';
import { z } from 'zod'
import { validateRequest } from '../../app/middleWares/validationRequest';
import { adminValidationSchema } from './admin.validation';

const router = express.Router();



router.get('/',AdminController.getAdmins)

router.get('/:id',AdminController.getAdminById)

router.patch('/:id',
    validateRequest(adminValidationSchema.update),
    AdminController.updateAdminData)

router.delete('/:id',AdminController.deleteAdmin)

router.delete('/soft/:id',
    AdminController.softDeletedAdmin);

export const AdminRoutes = router