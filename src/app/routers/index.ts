import express from 'express';
import { userRoutes } from '../../module/user/user.routes';
import { AdminRoutes } from '../../module/admin/admin.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path:'/user',
        route:userRoutes,
    },
    {
        path:'/admin',
        route:AdminRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path,route.route));


export default router;
