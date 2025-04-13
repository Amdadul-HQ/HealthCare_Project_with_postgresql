import express  from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/',AdminController.getAdmins)

router.get('/:id',AdminController.getAdminById)

router.patch('/:id',AdminController.updateAdminData)

router.delete('/:id',AdminController.deleteAdmin)

export const AdminRoutes = router