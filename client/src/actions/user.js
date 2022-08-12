import { FETCH_USER, UPDATE_USER } from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(id);
    dispatch({ type: FETCH_USER, payload: { user: data } });
  } catch (error) {
    console.log(error?.response.data);
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);
    console.log("updated User");
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error?.response.data);
  }
};
