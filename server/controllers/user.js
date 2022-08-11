//hash password
import bcrypt from "bcryptjs";
//import json web token
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "user doesnt exist" });

    //compare the hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    //if not correct
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    //if password is correct and user exists
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );

    //send over the exisiting user and newly generated token
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    if(password.length < 5 ) 
      return res.status(400).json({message: "Password too short"})

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.response });
    return;
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, companion, bio, email, password, userImage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).send("no use with this id found");
  }

  const updatedUser = {
    name,
    companion,
    bio,
    email,
    password,
    userImage,
    _id: id,
  };
  try {
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
