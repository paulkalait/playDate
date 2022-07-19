//post will be an array and
export default (posts = [], action) => {
  switch (action.type) {

    case 'DELETE':
      //keep all the posts that are not equal to the action . payload
      return posts.filter((post) => post._id !== action.payload)

      //since both of these cases do  the same thing
    case "UPDATE":
    case "LIKE": 
      //action.payload is the updated post, if they match then return the latest updated post
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      //new post is saved in action.payload.. appended to the post array
      return [...posts, action.payload];
    default:
      return posts;
  }
};
