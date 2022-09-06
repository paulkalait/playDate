import { 
    DELETE_CHAT
} from "../constants/actionTypes.js"

export default (state = { chats: []}, action) => {
    switch (action.type) {
        case DELETE_CHAT:
            return { 
                ...state, 
                chats: state.chats.filter((chat) => chat._id !== action.payload)
            }
        default:
            return state;
    }
}