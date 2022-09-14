import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  //passing it through the query via frontned
  const { page } = req.query;
  try {
    const LIMIT = 4;

    //convert page to a number
    const startIndex = (Number(page) - 1) * LIMIT; //get starting index from every page
    console.log(startIndex);
    const total = await PostMessage.countDocuments({});

    //gives newest post first
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    //convert for a regular expression for mongo is ignore case example Test and test is =
    const title = new RegExp(searchQuery, `i`);

    //find title or tags
    //is there a tag in this array of tags?
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPopular = async (req, res) => {
  const searchPopular = req.query.searchPopular
  //get current time
  let currentTime = new Date()
  //let within one day
  let oneDay = currentTime.setDate(currentTime.getDate()-1)
  //get from 7 days ago
  let sevenDays = currentTime.setDate(currentTime.getDate()-7)
  try {
    if(searchPopular === "twentyFourHours"){ 
      const twentyFourHours = await PostMessage.find({createdAt: { $gt: oneDay}}).sort({likes: -1}).limit(10)
      console.log(searchPopular)
    res.status(200).json(twentyFourHours)
    }
    //sort posts by most likes and within 7 days ago, but with a max of 50 posts
    if(searchPopular === "sevenDays"){
      const sevenDaysMostPopular = await PostMessage.find({createdAt: { $gt: sevenDays}}).sort({likes: -1}).limit(10)
      console.log(searchPopular)
      res.status(200).json(sevenDaysMostPopular)
    }
    //all time query
    if(searchPopular === "allTime"){ 
      const allTime = await PostMessage.find().sort({likes: -1}).limit(10)
      console.log(searchPopular)
      res.status(200).json(allTime)
    }
} catch (error) {
    res.status(500).json(error)
}
}

export const getSize  = async (req, res) => {
  const searchSize = req.query.searchSize
  try {
    const findSize =  new RegExp(searchSize, `i`)
    console.log(findSize)
    const postFound = await PostMessage.find({size: findSize})
    res.status(200).json({data: postFound})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
  
}
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    console.log("posted");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//posts/29283ue1
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, name, tags, selectedFile, size } = req.body;
  console.log("updated");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).send("no post with this id");
  }

  const updatedPost = {
    title,
    message,
    name,
    tags,
    selectedFile,
    size,
    _id: id,
  };
  try {
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with this id");

  await PostMessage.findByIdAndRemove(id);

  console.log("Post Deleted");

  res.json({ message: "Post Deleted" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with this id");

  const post = await PostMessage.findById(id);

  //each like will be from the id of a specific user
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like post
    //push his id in the likes array
    post.likes.push(req.userId);
  } else {
    //dislike a post
    //gives the array of all users other than the user who is getting filtered out
    post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  //get post id
  const { id } = req.params;
  //comes from the api request in the frontend { value } of the comment
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
export const giveTreat = async (req, res) => {
  //get post id
  const { id } = req.params;
if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post found with this id: ${id}`)

const post = await PostMessage.findById(id)

const updatedPost = await PostMessage.findByIdAndUpdate(id, { dogTreats: post.dogTreats + 1}, { new: true})

res.json(updatedPost)
};
export default router;
