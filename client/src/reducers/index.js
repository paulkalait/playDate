import { combineReducers } from "redux";
import posts from './posts.js'
import auth from './auth.js'
import user from "./user.js";

//uses the posts from .posts.js file
export const reducers = combineReducers({posts, auth, user})