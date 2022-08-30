import { FETCH_USER, UPDATE_USER, FETCH_USER_BY_SEARCH } from "../constants/actionTypes.js";
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
    dispatch({ type: UPDATE_USER, payload: data });
    console.log("updated User");
  } catch (error) {
    console.log(error?.response.data);
  }
};

export const getUserBySearch = (searchQuery) => async (dispatch) => {
 try {
   const { data: { data} } = await api.fetchUserBySearch(searchQuery)
   dispatch({type: FETCH_USER_BY_SEARCH, payload: data})
   console.log(data)
 } catch (error) {
   console.log(error?.response.data)
   
 }
}