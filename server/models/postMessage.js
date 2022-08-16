import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  //replace creator with name
  name: String,
  creator: String,
  tags: [String],
  size: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
   dogTreats: {
    type: Number,
    default: 0,
    required: false,
  }
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
