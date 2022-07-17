import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    //replace creator with name
    name: String,
    tags: [String],
    size: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;