import mongoose, { Types } from "mongoose";

const UserSChema = new mongoose.Schema({
  name: String,

  email: String,

  password: { type: String, required: true },

  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSChema);

export { User };
