import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

// "https://playdate-mern-app.herokuapp.com/"


// a function on each request. gets a request as first param to check if we are logged in
//
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    //set the req.headers.Auth to the token
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});



//passes page data to the backend
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const addDogTreat = (id) => API.patch(`/posts/${id}/treat`);
export const getUsers = () => API.get("/users");
export const signin = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const fetchUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, updatedUser) =>
  API.put(`/user/${id}`, updatedUser);
  export const userChats = (userId) => API.get(`/chat/${userId}`)
  export const getMessages = (id) => API.get(`/message/${id}`)
  export const addMessages = (data) => API.post(`/message`, data )

