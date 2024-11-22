const BookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    selectedPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPackage", // Reference to TravelPackage collection
      required: true,
    },
    numberOfTravelers: { type: Number, required: true },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Booking = mongoose.model("Booking", BookingSchema);
  