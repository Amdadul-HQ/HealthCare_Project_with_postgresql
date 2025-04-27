import express from "express";
import { userController } from "./user.controller";
import auth from "../../app/middleWares/auth";
import { UserRole } from "@prisma/client";
import { fileUploder } from "../../app/helper/fileUploader";

const router = express.Router();





router.post("/",
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    fileUploder.upload.single('file'), userController.createAdmin)

export const UserRoutes = router;