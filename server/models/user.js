import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  name: {
    type: String,
    required: true,
  },
  companion: {
    type: String,
    required: false
  },
  bio: { 
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  userImage: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("userSchema", userSchema);

export default User;