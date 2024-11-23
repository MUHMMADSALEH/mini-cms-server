import express from "express"
import { verifyToken,verifyAdminRole } from "../middleware.js"
import { BookingController } from "../controllers/booking.controller.js"

const router=express.Router()
router.get("/bookings",verifyToken,verifyAdminRole, BookingController.getAllBookings);
router.get("/bookings/:id",verifyToken ,BookingController.getBookingById);
router.get("/user-all-bookings",verifyToken ,BookingController.getUserBookings);
router.post("/book-package",verifyToken,BookingController.bookPackage)
router.put("/update-book-status",verifyToken,BookingController.updateBookingStatus)

export default router