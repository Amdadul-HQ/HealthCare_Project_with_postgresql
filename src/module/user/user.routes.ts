import express from "express";
import { userController } from "./user.controller";
import auth from "../../app/middleWares/auth";
import { UserRoles } from "../../app/constant/userRole";


const router = express.Router();

router.post("/",auth(UserRoles.admin),userController.createAdmin)

export const UserRoutes = router;