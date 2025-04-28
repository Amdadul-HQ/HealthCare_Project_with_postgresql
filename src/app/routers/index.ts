import express from 'express';
import { UserRoutes } from '../../module/user/user.routes';
import { AdminRoutes } from '../../module/admin/admin.routes';
import { AuthRoutes } from '../../module/auth/auth.route';
import { SpecialtiesRoutes } from '../../module/specialties/specialties.route';

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
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/specialties',
        route:SpecialtiesRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path,route.route));


export default router;
