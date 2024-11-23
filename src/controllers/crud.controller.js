import TravelPackage from "../models/package.model.js"

class Crudcontrollers{
    static  addPackage= async(req,res)=>{
        console.log("add package body   :",req.body)
        const {destinationName,packageTitle, description,price,availableDates, maxTravelers}=req.body
        try {
            const existingPackage=await TravelPackage.find({packageTitle})
            console.log(existingPackage)
            if(!existingPackage) return res.status(400).json({status:false,message:"Package already exist"})
            const newPackage=await TravelPackage.create({destinationName,packageTitle, description,price,availableDates, maxTravelers})
          res.status(201).json({status:true,data:newPackage,message:"Package created successfully"})
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
        

    } 
    static  getSpecificPackage= async(req,res)=>{
        const id = req.params.id.trim(); 
        try {
            const existingPackage=await TravelPackage.findOne(id)
            console.log(existingPackage)
            if(!existingPackage) return res.status(404).json({status:false,message:"Package not found"})
          res.status(201).json({status:true,data:existingPackage})
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
        

    }
    static  getAllPackage= async(req,res)=>{
       
        try {
            const existingPackages=await TravelPackage.find()
            console.log(existingPackages)
            if(!existingPackages) return res.status(404).json({status:false,message:"Packages not found"})
          res.status(201).json({status:true,data:existingPackages})
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
        

    } 
    static updatePackage = async (req, res) => {
    
        const id = req.params.id.trim(); 
        const { price, packageTitle } = req.body; 
    
        try {
            // Update the price and packageTitle fields
            const updatedPackage = await TravelPackage.findByIdAndUpdate(
                id, // Find document by ID
                { $set: { price, packageTitle } }, // Update these fields
                { new: true } // Return the updated document
            );
    
            // Check if the package was found
            if (!updatedPackage) {
                return res.status(404).json({ status: false, message: "Package not found" });
            }
    
            res.status(200).json({ status: true, data: updatedPackage });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    };

    static deletePackage=async(req,res)=>{

        const id = req.params.id.trim()

        try {
            const deletedPackage=await TravelPackage.findByIdAndDelete(id)
            console.log("deleted data",deletedPackage)
        if(!deletedPackage) return res.status(404).json({status:false,message:"Package not found"})

         return res.status(200).json({status:true,message:"Package is successfully deleted."})  
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({status:false,message:error.message})
        }


    }
    
}

export default Crudcontrollers