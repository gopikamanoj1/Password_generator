// userRepository.js

// import { User } from '../Database/index.js';
// import { GeneratedPassword } from '../Database/index.js';
import {DatabaseSchema} from '../Database/index.js';
export default {


  findUserByEmail: async (email) => {
    console.log(email, "jiji");
    try {
      const user = await DatabaseSchema.User.findOne({ email });
      return user;
    } catch (error) {
      console.error("Error in findUserByEmail:", error);
      throw new Error("Database query failed");
    }
  },

  registerUser: async (data) => {
    try {
      const { name, email, password } = data;

      const user = new DatabaseSchema.User({
        name,
        email,
        password,
      });

      const response = await user.save();
      // return response;
      return {status:true,data:response}
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw new Error("User registration failed");
    }
  },
  loginUser:async (email)=>{
    try {
      const findUser = await DatabaseSchema.User.findOne({ email });
      console.log(findUser, "finding user");
      if (findUser) {
        return { status: true, data: { hashedPassword: findUser.password },findUser };
      } else {
        return { status: false, message: "User not found" };
      }
    } catch (error) {
      console.error('Error in user login', error);
      throw new Error('User login failed');
    }
  },

  savePassword:async(data)=>{
    try {
      const {password,email}=data
      const generatedPassword = new DatabaseSchema.GeneratedPassword({
        password,
        email,
      });

      const response = await generatedPassword.save();
      if ( response){
        return { status : true , data: response}
      } else{
        return { status : false , data : " something went wrong "}
      }
    } catch (error) {
      console.error("Error in saveGeneratedPassword:", error);
      throw new Error("Failed to save generated password");
    }
  },

  
  getPassword: async (data)=>{
    try {
      const {email}= data
      const passowrds = await DatabaseSchema.GeneratedPassword.find({ email });
      if (passowrds){
        return { status: true, data: passowrds}

      }
      else{
        return { status : false, data :" No passwords "}
      }

    } catch (error) {
      console.log(error)
      return { status : false, data :" something went wrong  "}


    }
  },
  editPassword: async (data)=>{
    try {
      const {email,password,_id}=data
      const existingPassword=await DatabaseSchema.GeneratedPassword.findById(_id)
      if (existingPassword){
        existingPassword.password = password; // Update the password
        await existingPassword.save(); // Save the updated password

        return { status: true, data: "Password updated successfully" };
      } else {
        return { status: false, data: "Password not found" };
      }
      
    } catch (error) {
      console.log(error);
      return { status: false , data : "something went wrong "}
    }
  },
  deletePassword:async (data)=>{
    try {
      const { passwordId }=data
      // Check if the password exists in the database
      const findPassword = await DatabaseSchema.GeneratedPassword.findById(passwordId);
    
      if (!findPassword) {
        return { status: false, data: "Password not found" };
      }
  
      // Delete the password
      const deletedPassword = await DatabaseSchema.GeneratedPassword.findByIdAndDelete(passwordId);
      
      if (!deletedPassword) {
        return { status: false, data: "Failed to delete password" };
      }
  
      console.log(`Deleted password: ${deletedPassword}`); // Log the deleted password for debugging
      return { status: true, data: "Password deleted successfully" };
      
    } catch (error) {
      console.log(error);
      return { status: false, data : " something went wrong "}
    }
  }


};
