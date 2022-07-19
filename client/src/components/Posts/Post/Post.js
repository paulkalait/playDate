import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Card } from "@material-ui/core";
import moment from "moment";
import "./styles.css";
import { useDispatch } from 'react-redux';
import { deletePost } from "../../../actions/posts";

const Post = ({ post, currentId, setCurrentId}) => {
  const dispatch  = useDispatch()
  return (
    <Card className="card">
      <div className="title-date-img">
        <div className="title-date">
          <h2>{post.title}</h2>
          <h5 className="time">{moment(post.createdAt).fromNow()}</h5>
        </div>
      </div>
      <img src={post.selectedFile} alt="usersimage" />
      <div className="name-size">
        <h5 className="username">Name {post.name}</h5>
        
        
 {/*  {post.size && "medium" (<span>mediumsizedog</span>)} */}
       <h5 className="size">{post.size}</h5>


      </div>

      <div>
        <button className="more" onClick={() => setCurrentId(post._id)}>
          {" "}
          <MoreHorizIcon  className="more-icon"/>
        </button>
      </div>

      <div className="tag-div">
        {post.tags.map((tag) => (
          <span className="tag"># {tag}</span>
        ))}
      </div>
      <p>{post.message}</p>

      <div className="buttons-container">
        <div className="thumbs-up-div">
          <button className="thumbs-up" onClick={() => {}}>
            <ThumbUpAltIcon className="thumbsUp" />
          </button>
          <span>{post.likeCount} Likes</span>
        </div>
        <div>
          <button onClick={() => dispatch(deletePost(post._id))} className="delete-icon-container">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Post;
