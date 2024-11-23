import express from "express"
import { verifyToken } from "../middleware"

const router=express.Router()

router.post("book-package",verifyToken)