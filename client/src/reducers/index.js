import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'

//uses the posts from .posts.js file
export default combineReducers({posts, auth})