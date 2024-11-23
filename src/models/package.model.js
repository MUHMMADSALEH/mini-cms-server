import mongoose from "mongoose";

const TravelPackageSchema = new mongoose.Schema({
    destinationName: { type: String, required: true },
    packageTitle: { type: String, required: true,unique:true},
    description: { type: String },
    price: { type: Number, required: true },
    availableDates: [{ type: Date }], // List of dates when the package is available
    maxTravelers: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User collection
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const TravelPackage = mongoose.model("TravelPackage", TravelPackageSchema);
  export default TravelPackage