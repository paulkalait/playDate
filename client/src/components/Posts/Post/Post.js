import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Card } from "@material-ui/core";
import moment from "moment";
import "./styles.css";

const Post = ({ post }) => {
  return (
    <Card className="card">
    <div className="title-date-img">
    <div className="title-date">
    <h2>{post.title}</h2>
    <h5>{moment(post.createdAt).fromNow()}</h5>
    </div>
      <img src={post.selectedFile} alt="usersimage" />
      </div>

      <div className="name-size">
        <h5>Name {post.name}</h5>
        <h5>{post.size}</h5>
      </div>
    
      <div>
        <button className="more" onClick={() => {}}>
          {" "}
          <MoreHorizIcon />
        </button>
      </div>

      <div className="tag-div">{post.tags.map((tag) => <span className="tag"># {tag}</span>)}</div>
      <p>{post.message}</p>

      <div className="buttons-container">
      <div className="thumbs-up-div">
      <button className="thumbs-up" onClick={() => {}}>
        <ThumbUpAltIcon  className="thumbsUp"/>
   
      </button>
      <span>{post.likeCount} Likes</span>
    </div>
    <div>
      <button onClick={() => {}} className="delete-icon-container">
        <DeleteIcon />
      </button>
    </div>
      </div>
     
    </Card>
  );
};

export default Post;
