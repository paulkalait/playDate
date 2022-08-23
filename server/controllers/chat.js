
import chatModel from "../models/chatModel.js";

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