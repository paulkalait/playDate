import { AUTH } from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const signin = (formData, history) => async(dispatch) => {
try {
   /// login the user

 history.push('/')
} catch (error) {
    console.log(error)
}
}
export const signup = (formData, history) => async(dispatch) => {
    try {
       /// sign up the user
    
     history.push('/')
    } catch (error) {
        console.log(error)
    }
    }