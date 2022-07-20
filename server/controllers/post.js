import express from 'express'
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
    const { title, message, name, tags, size, selectedFile } = req.body

    const newPost = new PostMessage({title, message, name, tags, size, selectedFile })
  try {
     await newPost.save();
    console.log("posted")
     res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.message})
    
  }
};

//posts/29283ue1
export const updatePost = async (req, res) => {
const { id } = req.params
const { title, message, name, tags, selectedFile, size} = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id')
  const updatedPost = {  title, message, name, tags, selectedFile, size, _id: id};
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true});
 

   res.json(updatedPost)
}

export const deletePost = async (req, res ) => {
  const { id} = req.params;



  if(!mongoose.Types.ObjectId.isValid(id)) return res.statu(404).send('no post with this id')

 await PostMessage.findByIdAndRemove(id);

 console.log('Delete')

  res.json({message: 'Post Deleted'})
}

export const likePost = async (req, res) => {
  const { id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id')

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true})

  res.json(updatedPost)
}


export default router