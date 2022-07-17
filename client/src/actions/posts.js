import * as api from "../api";
//will allow  to import everything from api file into to this file

//reduc thunk allows an additonal function for async =>   =>

//Action Creators are functions that return an action type and table

export const getPosts = () => async (dispatch) => {
  try {
    //fetch data from api
    const { data } = await api.fetchPosts;
    //call the async dispatch from thunk
    //payload is the data send the api data into the payload
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
  //payload is the data where we store all of our posts
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
