import express from 'express';
import { UserRoutes } from '../../module/user/user.routes';
import { AdminRoutes } from '../../module/admin/admin.routes';
import { AuthRoutes } from '../../module/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
    {
        path:'/user',
        route:UserRoutes,
    },
    {
        path:'/admin',
        route:AdminRoutes
    },
    {
        path:'auth',
        route:AuthRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path,route.route));


export default router;
