import Booking from "../models/booking.model.js"
import TravelPackage from "../models/package.model.js"

export class BookingController {
    static bookPackage = async (req, res) => {
        console.log("bookPackage body  :", req.body)
        const { customerName, contactInfo, selectedPackage, userId, numberOfTravelers } = req.body
        const packageId = selectedPackage.packageId
        try {
            const existingPackage = await TravelPackage.findOne({ _id: packageId })
            if (!existingPackage) return res.status(404).json({ status: false, message: "Package not found" })

            await Booking.create({ customerName, contactInfo, selectedPackage: packageId, userId, numberOfTravelers })
            return res.status(201).json({ status: true, message: "Booked Package successfully" })
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }


    }
    
    static updateBookingStatus = async (req, res) => {
        const { bookingId, status } = req.body;
      
        try {
          if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
            return res.status(400).json({ status: false, message: "Invalid booking status" });
          }
      
          const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { bookingStatus: status, updatedAt: Date.now() },
            { new: true }
          );
      
          if (!booking) {
            return res.status(404).json({ status: false, message: "Booking not found" });
          }
      
          return res.status(200).json({ status: true, message: "Booking status updated successfully", booking });
        } catch (error) {
          return res.status(500).json({ status: false, message: error.message });
        }
      };

      static getAllBookings = async (req, res) => {
        try {
          const bookings = await Booking.find()
            .populate("selectedPackage") // Populate package details
 // Populate user details (only name and email)
            .exec();
      
          return res.status(200).json({
            status: true,
            message: "All bookings fetched successfully",
            bookings,
          });
        } catch (error) {
          return res.status(500).json({
            status: false,
            message: error.message,
          });
        }
      };

      static getBookingById = async (req, res) => {
        const { id } = req.params;
      
        try {
          const booking = await Booking.findById(id)
            .populate("selectedPackage") // Populate package details
            .populate("userId", "name email") // Populate user details (only name and email)
            .exec();
      
          if (!booking) {
            return res.status(404).json({
              status: false,
              message: "Booking not found",
            });
          }
      
          return res.status(200).json({
            status: true,
            message: "Booking fetched successfully",
            booking,
          });
        } catch (error) {
          return res.status(500).json({
            status: false,
            message: error.message,
          });
        }
      };
      static getUserBookings = async (req, res) => {
        const userId = req.user.id; // Assuming `req.user` is populated via authentication middleware.
      console.log("userId",userId)
        try {
          const bookings = await Booking.find({ userId })
            .populate("selectedPackage")
            .exec();
      
          if (!bookings || bookings.length === 0) {
            return res.status(404).json({
              status: false,
              message: "No bookings found for the user.",
            });
          }
      
          return res.status(200).json({
            status: true,
            message: "User bookings fetched successfully",
            bookings,
          });
        } catch (error) {
            console.log(error)
          return res.status(500).json({
            status: false,
            message: error.message,
          });
        }
      };
            
      
}