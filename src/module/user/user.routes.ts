import express from "express";
import { userController } from "./user.controller";
import auth from "../../app/middleWares/auth";
import { UserRole } from "@prisma/client";
import multer from "multer";
import path from "path";

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(),'/uploads'))
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


router.post("/",
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    upload.single('file'), userController.createAdmin)

export const UserRoutes = router;