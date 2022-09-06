import { DELETE_CHAT} from "../constants/actionTypes"
import * as api from "../api/index.js"

export const deleteChat =(id) => async (dispatch) =>{
    try {
        await api.deleteChat(id)
        dispatch({type: DELETE_CHAT, payload: id})
    } catch (error) {
        console.log(error)
    }
}