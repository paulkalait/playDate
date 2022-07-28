
import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH,START_LOADING, END_LOADING,  CREATE, UPDATE, LIKE, DELETE } from "../constants/actionTypes.js";
//will allow  to import everything from api file into to this file
import * as api from "../api/index.js";

//reduc thunk allows an additonal function for async =>   =>

//Action Creators are functions that return an action type and table

//only fetch post for that specific page 
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    //fetch data from api
                //then pass page into the api
    const { data: { data, currentPage, numberOfPages} } = await api.fetchPosts(page);

    console.log(data)
    //call the async dispatch from thunk
    //payload is the data send the api data into the payload
    dispatch({ type: FETCH_ALL, payload:{ data, currentPage, numberOfPages}  });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.response?.data);
  }
  //payload is the data where we store all of our posts
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data} = await api.fetchPost(id)
  
  
    dispatch({ type: FETCH_POST, payload: {post: data}})  
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.response?.data)
  }
 
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    //sends data to reducers
    const { data: { data} } = await api.fetchPostBySearch(searchQuery)
  
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    //post api request to our backend server 
    console.log("hello")
    const { data } = await api.createPost(post);

    //after you get the detail, reroute to details page
    history.push(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try{

   const { data} = await api.updatePost(id, post)

   console.log('updated')
   dispatch({type: UPDATE, payload: data})
  }catch(error){
  
      console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({type: DELETE, payload: id})

  } catch (error) {
    console.log(error)
    
  }
}


export const likePost = (id) => async (dispatch) => {
  try{
   const { data} = await api.likePost(id)

   dispatch({type: LIKE, payload: data})
  }catch(error){
      console.log(error)
  }
}