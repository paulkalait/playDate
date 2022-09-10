import {
  FETCH_ALL,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT,
  ADD_DOG_TREAT,
  FETCH_USER_BY_SIZE,
  FETCH_POST_BY_SIZE
} from "../constants/actionTypes";

export default (state = { posts: [], isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload.post,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST_BY_SIZE:
      return {
        state, 
        posts: action.payload
      }
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // if the post is equal to the post we want to add the comment on..
          if (post._id === action.payload._id) {
            return action.payload;
          }

          //else just leave the post be
          return post;
        }),
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
      case ADD_DOG_TREAT:
        return {
          ...state,
          posts: state.posts.map((post) =>  (post._id === action.payload._id ? action.payload : post)),
        };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

