import express  from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/',AdminController.getAdmins)

router.get('/:id',AdminController.getAdminById)

export const AdminRoutes = router