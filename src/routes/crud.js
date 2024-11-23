import express from "express"

import Crudcontrollers from "../controllers/crud.controller.js"
import { verifyAdminRole, verifyToken } from '../middleware.js';

const router=express.Router()

router.post("/add",verifyToken,verifyAdminRole,Crudcontrollers.addPackage)
router.get("/package/:id",verifyToken,Crudcontrollers.getSpecificPackage)
router.get("/all-package",verifyToken,Crudcontrollers.getAllPackage)
router.put("/update/:id",verifyToken,verifyAdminRole,Crudcontrollers.updatePackage)
router.delete("/delete/:id",verifyToken,verifyAdminRole,Crudcontrollers.deletePackage)

export default router