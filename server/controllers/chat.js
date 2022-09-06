
import mongoose from "mongoose";
import express from "express";
import chatModel from "../models/chatModel.js";
const router = express.Router();


// export const getChat = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const chat = await chatModel.findById(id);
  
//       res.status(200).json(chat);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   };
export const createChat = async(req, res) => {
    const newChat = new chatModel({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const result = await newChat.save()
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export const userChats = async(req, res) => {
    try {
        const chat = await chatModel.find({
            //should include the users id from the params
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const findChat = async(req, res) => {
    try {
        const chat = await chatModel.findOne({
            //memebrs should includee the first id and the second person id
            members: {$all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).json(chat)
        
    } catch (error) {
        res.status(404).json(error)
    }
}
export const deleteChat = async (req, res) => {
    const { id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no chat with this id to delete")
    await chatModel.findByIdAndRemove(id)
    console.log("chat deleted")
    res.json({message: "Chat deleted"})
}

export default router