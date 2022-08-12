import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

//-----------------------dispatches-------------

export const signUp = (formData, router) => async (dispatch) => {
  try {
    /// sign up the user
    console.log("test");
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/posts");
  } catch (error) {
    console.error("error response", error.response?.data);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    /// login the user this action makes a call to the axios api
    const { data } = await api.signin(formData);

    dispatch({ type: AUTH, data });

    history.push("/posts");
  } catch (error) {
    console.error("error response", error.response?.data);
  }
};
