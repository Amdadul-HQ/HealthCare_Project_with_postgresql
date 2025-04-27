import express from "express"
import { AuthController } from "./auth.controller"
import auth from "../../app/middleWares/auth"
import { UserRole } from "@prisma/client"