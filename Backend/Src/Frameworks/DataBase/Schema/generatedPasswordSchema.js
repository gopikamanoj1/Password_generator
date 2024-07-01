import mongoose, { Types } from "mongoose";

const generatedPasswordSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
      },
      email :{
        type:String
      },
    
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User schema if associated with a user
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

const GeneratedPassword = mongoose.model("GeneratedPassword", generatedPasswordSchema);

export { GeneratedPassword };
