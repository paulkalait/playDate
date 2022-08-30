import { FETCH_USER, UPDATE_USER, FETCH_USER_BY_SEARCH } from "../constants/actionTypes";
export default (state = { user: [] }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    case UPDATE_USER:
      return {
        ...state,
        user: state.user.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
      case FETCH_USER_BY_SEARCH: 
      return { 
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};
