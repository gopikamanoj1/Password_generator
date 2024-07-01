import { hashPassword } from "../../../../Utils/hashPassword.js";
import jwt from "jsonwebtoken";

export const registerController = (dependencies) => {
  const { registerUseCase } = dependencies.useCase;
  return async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      // Hash the password
      const hashedPassword = await hashPassword(password);
      const data = { name, email, password: hashedPassword }; 

      // Register the user
      const response = await registerUseCase(dependencies).executeFunction(data);
      
      if (response.status) {
        // Create JWT token
        const token = jwt.sign({ userId: response.data._id, email: response.data.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ status: true, token, data: response.data });
      } else {
        res.status(409).json({ status: false, data: response.data }); // Use proper HTTP status code for conflict
      }  
    } catch (error) {
      console.error("Error in register controller:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
};