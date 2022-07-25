import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Card } from "@material-ui/core";
import moment from "moment";
import "./styles.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts.js";
import dog from "../../../assets/images/doglogo.png";
import PLACEHOLDER from "../../../assets/images/placeholder-image.png";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {

    //async call meaning at some point prior post.likes is undefined so put a ? 
    if (post.likes?.length > 0) {
      console.log(post.likes.length)
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon className="thumbsUp" fontSize="small" />
          &nbsp;
          {post.likes?.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined className="thumbsUp" fontSize="small" />
          &nbsp;{post.likes?.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" className="thumbsUp" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className="card" raised elevation={4} >
      <div className="title-date-img">
        <div className="title-date">
          <h2>{post.title}</h2>
          <h5 className="time">{moment(post.createdAt).fromNow()}</h5>
        </div>
      </div>
      {post.selectedFile ? (
        <img src={post.selectedFile} alt="usersimage" />
      ) : (
        <img src={PLACEHOLDER} alt="usersimage" />
      )}

      <div className="name-size">
        <h5 className="username">{post.name}</h5>

        {/*   <h5 className="size">{post.size}</h5>*/}

        {post.size.includes("medium") ? (
          <img src={dog} alt="doglogo" className="mediumdog" />
        ) : (
          ""
        )}
        {post.size.includes("small") ? (
          <img src={dog} alt="doglogo" className="smalldog" />
        ) : (
          ""
        )}
        {post.size.includes("large") ? (
          <img src={dog} alt="doglogo" className="largedog" />
        ) : (
          ""
        )}
      </div>

      {user?.result?._id === post?.creator && (
        <div>
          <button className="more" onClick={() => setCurrentId(post._id)}>
            {" "}
            <MoreHorizIcon className="more-icon" />
          </button>
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

        {user?.result?._id === post?.creator && (
          <div>
            <button
              onClick={() => dispatch(deletePost(post._id))}
              className="delete-icon-container"
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Post;
