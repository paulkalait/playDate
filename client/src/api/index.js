import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:3001' });


// a function on each request. gets a request as first param to check if we are logged in 
//
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    //set the req.headers.Auth to the token 
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

      //passes page data to the backend
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)


export const getUsers = () => API.get('/users')
export const signin = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);