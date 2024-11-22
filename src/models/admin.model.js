const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    createdAt: { type: Date, default: Date.now },
  });
  
  const Admin = mongoose.model("Admin", AdminSchema);
  