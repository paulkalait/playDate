import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PLACEHOLDER from "../../assets/images/placeholder-image.png";
import { useParams, useHistory } from "react-router-dom";
import "./style.css";
import { getPost } from "../../actions/posts";

const PostDetails = () => {
  // get data from the useSelctor for the posts
  const { posts, post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  if (!post) return null;

  if (isLoading) {
    return (
      <div>
        <CircularProgress size="3rem" />
      </div>
    );
  }

  return (
    <div className="post-details-container">
      {/* post details */}
      <div className="post-details">
        <div className="postdetail-title-div">
        <h1>{post.title}</h1>
        </div>
      
        <div className="postdetail-username-div">
          <h2>{post.name}</h2>
          <h3 className="time">{moment(post.createdAt).fromNow()}</h3>
        </div>

        <div className="tag-div">
          {post.tags.map((tag) => (
            <span className="tag"># {tag}</span>
          ))}
        </div>
      <div className="postdetail-description-div">
      <p>{post.message}</p>
      </div>
      
      </div>

      {/* post image*/}
      <div className="post-image">
        <img src={post.selectedFile} />

       
      </div>
    </div>
  );
};

export default PostDetails;
