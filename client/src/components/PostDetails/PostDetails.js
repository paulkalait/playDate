import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import "./style.css";
import { getPost, getPostBySearch, addDogTreat } from "../../actions/posts";
import AVATAR from "../../assets/images/account-logo.svg";
import CommentSection from "../CommentSection/CommentSection";
import AddTreatModel from "../AddTreatModel/AddTreatModel.js";

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  // get data from the useSelctor for the posts
  const { posts, post, isLoading } = useSelector((state) => state.posts);

  const [showModal, setShowModal] = useState(false);
  const [treat, setTreat] = useState(post?.dogTreats);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [post, dispatch]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size="3rem" />
      </div>
    );
  }

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTreat = async () => {
    const addedTreat = await dispatch(addDogTreat(post._id));

    setShowModal(false);
    setTreat(addedTreat);
  };

  //current post cant be in recommneded post
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const getProfile = () => {
    history.push(`/user/${post.creator}`);
  };
  return (
    <div className="post-details-container">
      <AddTreatModel
        show={showModal}
        close={handleToggleModal}
        handleTreat={handleTreat}
      />

      {/* post details */}
      <div className="post-details-and-comments">
        <div className="post-details">
          <div className="postdetail-title-div">
            <h1>{post.title}</h1>

            <div className="new-post-and-treat-div">
              {moment(post.createdAt).fromNow().includes("minutes") && (
                <span className="new-post">new post</span>
              )}

              <button
                value={treat}
                onClick={handleToggleModal}
                className="give-a-treat-btn"
              >
                Give a Treat
              </button>
            </div>
          </div>

          <div className="postdetail-username-div">
            <h2 onClick={getProfile}>{post.name}</h2>

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

        <div className="comments-section">
          <CommentSection post={post} />
        </div>
      </div>

      {/* post image*/}
      <div className="post-image">
        <img src={post.selectedFile} alt="postImage" id="postImage" />
        <h5>You might also like..</h5>
        {console.log(recommendedPosts)}
        {!!recommendedPosts.length && (
          <div className="recommended-post-container">
            <br></br>
            <div className="recommended-post">
              {recommendedPosts.map(
                ({ title, message, name, selectedFile, _id }) => (
                  <div
                    onClick={() => openPost(_id)}
                    key={_id}
                    className="each-recommended-post"
                  >
                    <div className="title-date">
                      <div className="username-div">
                        {user?.userImage ? (
                          <img src={user.userImage} alt="userprofile" />
                        ) : (
                          <img
                            src={AVATAR}
                            alt="userprofileimage"
                            className="avatar"
                            id="recommended-post-avatar"
                          />
                        )}
                        <h5 className="username">{post.name}</h5>
                      </div>
                      <h5 className="time">
                        {moment(post.createdAt).fromNow()}
                      </h5>
                    </div>
                    <img
                      src={selectedFile}
                      alt="recommndedposttitle"
                      id="recommended-image"
                    />
                    <h2>{title}</h2>
                    <h2>{name}</h2>
                    <p>{message}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
