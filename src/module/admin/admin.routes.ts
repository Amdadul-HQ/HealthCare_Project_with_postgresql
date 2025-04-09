import express  from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/',AdminController.getAdmins)

export const AdminRoutes = router