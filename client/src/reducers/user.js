import { FETCH_USER, UPDATE_USER} from "../constants/actionTypes";

export default (state = {user: []}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    case UPDATE_USER: 
    return { ...state,
    user: state.user.map((u) => u._id === action.payload._id ? action.payload : u)
    }
    default:
      return state;
  }
};
