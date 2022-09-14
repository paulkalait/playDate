import React from "react";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useHistory } from "react-router-dom";
import AVATAR from "../../../assets/images/account-logo.svg";
import moment from "moment";
import "./styles.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts.js";
import dog from "../../../assets/images/doglogo.png";
import PLACEHOLDER from "../../../assets/images/placeholder-image.png";

const Post = ({ post, setCurrentId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    //async call meaning at some point prior post.likes is undefined so put a ?
    if (post.likes?.length > 0) {
      console.log(post.likes.length);
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <Favorite className="heart" fontSize="small" />
          &nbsp;
          {post.likes?.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorder className="hearts-outline" fontSize="small" />
          &nbsp;{post.likes?.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorder fontSize="hearts-outline" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <div className="card" raised elevation={4}>
      <span onClick={openPost}>
        <div className="title-date-img">
          <div className="title-date">
            <div className="username-div">
              {user?.userImage ? (
                <img src={user.userImage} alt="userprofile" />
              ) : (
                <img src={AVATAR} alt="userprofileimage" className="avatar" />
              )}
              <h5 className="username">{post.name}</h5>
            </div>
            <h5 className="time">{moment(post.createdAt).fromNow()}</h5>
          </div>
        </div>
        </span>
        {post.selectedFile ? (
          <div className="post-image-container">
            <img src={post.selectedFile} alt="usersimage" />
          </div>
        ) : (
          <img src={PLACEHOLDER} alt="usersimage" />
        )}

        <div className="name-size">
          <h2>{post.title}</h2>
          {post.size.includes("small") ? (
            <span className="dog-size">small</span>
          ) : (
            ""
          )}
          {post.size.includes("medium") ? (
          <span className="dog-size">medium</span>
          ) : (
            ""
          )}
          {post.size.includes("large") ? (
          <span className="dog-size">large</span>
          ) : (
            ""
          )}
        </div>
  
        {user?.result?._id === post?.creator && (
          <div className="div-more">
            <button className="more">
              {" "}
              <MoreHorizIcon className="more-icon" />
            </button>

            <div className="select">
              <div className="absolulte-tip"></div>
              <div className="more-select-div" onClick={() => setCurrentId(post._id)}>
                <h4>Edit</h4>
                <button className="edit-icon-container" >
                  <EditIcon className="edit-icon"/>
                </button>
              </div>
              <div className="delete-select-div" onClick={() => dispatch(deletePost(post._id))}>
                <h4>Delete</h4>
                <button className="delete-icon-container" >
                  <DeleteIcon className="delete-icon" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="tag-div">
          {post.tags.map((tag) => (
            <span className="tag"># {tag}</span>
          ))}
        </div>
        <p>{post.message}</p>
      
      <div className="buttons-container">
        <div className="thumbs-up-div">
          <button
            className="thumbs-up"
            onClick={() => dispatch(likePost(post._id))}
            disabled={!user?.result}
          >
            <Likes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
