import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import "./styles.css";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  //grab the user
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  console.log(user);

  const handleClick = async () => {
    //get the users name  and the state
    const finalComment = `${user.result.name}: ${comment}`;
    //dispatch
    const newComments = await dispatch(commentPost(finalComment, post._id));

    //will update the comments without refreshing page.
    setComments(newComments);
    setComment("");

    //scroll down when we add new coimment
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(post);
  return (
    <div>
      <div className="comments-container">
        <div className="comments-content">
          <h3>Comments</h3>
          {comments.map((c, i) => (
            <span className="comment-and-user-container">
              {" "}
              <span className="user-comment">{c.split(": ")[0]}</span>
              <div className="comment-text-container">
              <h4 key={i}>{c.split(":")[1]}</h4>
              </div>
              
            </span>
          ))}
          <div ref={commentsRef} />
        </div>

        {/* comments input */}
        {user?.result?.name && (
          <div className="write-comment-div">
            <h3>Write a comment</h3>
            <textarea
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button disabled={!comment} onClick={handleClick}>
              Add Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
