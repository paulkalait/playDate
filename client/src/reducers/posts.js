

//post will be an array and
export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
        
      return action.payload;
    case "CREATE":

    //new post is saved in action.payload.. appended to the post array 
      return [...posts, action.payload];
    default:
      return posts;
  }
};
