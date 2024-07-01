import { User } from '../database/index.js';
import { GeneratedPassword } from '../database/index.js';
export default {


  findUserByEmail: async (email) => {
    console.log(email, "jiji");
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error("Error in findUserByEmail:", error);
      throw new Error("Database query failed");
    }
  },

  registerUser: async (data) => {
    try {
      const { name, email, password } = data;

      const user = new User({
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
      const findUser = await User.findOne({ email });
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
      const generatedPassword = new GeneratedPassword({
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
      const passowrds = await GeneratedPassword.find({ email });
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
  }


};
