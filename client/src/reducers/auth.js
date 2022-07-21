import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducter = (state = { authData: null }, action) => {
  switch (action.type) {
    //if action type is equal to auth
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(...action?.data));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      //just return the auth state if we have nothing
      return state;
  }
};

export default authReducter;
