import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)
  try {
     await newPost.save();

     res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.message})
    
  }
};

//posts/29283ue1
export const updatePost = async (req, res) => {
  //receiving post from req.body
  const post = req.body
  //destrtucture
  const { id: _id } = req.params;

  //check if mongoose id

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.statu(404).send('no post with this id')

 

   const updatedPost = await PostMessage.findById(_id,   { ...post, _id}, { new: true} )


   res.json(updatedPost)
}

export const deletePost = async (req, res ) => {
  const { id} = req.params;



  if(!mongoose.Types.ObjectId.isValid(id)) return res.statu(404).send('no post with this id')

 await PostMessage.findByIdAndRemove(id);

 console.log('Delete')

  res.json({message: 'Post Deleted'})
}
