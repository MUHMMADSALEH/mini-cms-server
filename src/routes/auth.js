import express from "express"
import { AuthController } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signin",AuthController.signin)
router.post("/signup",AuthController.signup)

export default router