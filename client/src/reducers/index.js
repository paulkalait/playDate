import { combineReducers } from "redux";
import posts from './posts.js'
import auth from './auth.js'

//uses the posts from .posts.js file
export default combineReducers({posts, auth})