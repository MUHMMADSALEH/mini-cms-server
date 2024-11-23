import jwt from "jsonwebtoken";

 process.env.JWT_SECRET_KEY;

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    // console.log("cookies", req.cookies?.auth_token)
     // Retrieve the token from the cookie
     const token = req.cookies?.auth_token;

     if (!token) {
         return res.status(401).json({ status: false, message: "Unauthorized access" });
     }
 
     try {
         const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY  );
         req.user = decoded; // Attach user info to the request object
         next();
     } catch (error) {
        // console.error("JWT Verification Error:", error.message);
         res.status(500).json({ status: false, message: "Invalid or expired token" });
     }
};

// Middleware to check if the user is an admin
export const verifyAdminRole = (req, res, next) => {
    console.log("user from verifyAdminRole()",req.user)
    if (req?.user?.role !== "admin") {
        return res.status(403).json({ status: false, message: "Access denied, admin only" });
    }
    next();
};
