import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/user";
import { Link, useParams } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import UserProfileForm from "./UserProfileForm/UserProfileForm";
import AVATAR from "../../assets/images/account-logo.svg";
import "./style.css";
import Post from "../Posts/Post/Post";

const Profile = () => {
  const [userId, setUserId] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useSelector((state) => state.user || {});
  const { posts} = useSelector((state) => state.posts || {})
  console.log({posts})
  console.log(user);
  const dispatch = useDispatch();
  const { id } = useParams();

  //get the posts where the id (creator) matches user's Id
  const usersPosts = posts.filter(({creator}) => creator === id )

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const openEditForm = () => {
    setShowEditModal(!showEditModal);
  };
  const closeEditForm = () => {
    setShowEditModal(false);
  };

console.log(usersPosts)
  return (
    <div className="profile-container">
      <UserProfileForm
        show={showEditModal}
        close={closeEditForm}
        userId={userId}
        setUserId={setUserId}
      />
      <div className="back-to-home">
        <Link to="/posts">
          <div className="back-to-home-div">
            <ArrowBack style={{ color: "rgb(57, 57, 57)" }} />
            <span className="span">Back to home</span>
          </div>
        </Link>
      </div>
      <div className="user-container">
        <div className="image-container">
          {user.userImage ? (
            <img
              src={user.userImage}
              className="profile-photo"
              alt="usersprofilephoto"
            />
          ) : (
            <img
              src={AVATAR}
              className="profile-photo"
              alt="defaultprofilephoto"
            />
          )}
        </div>
        <div className="user-info-container">
          <div className="username-and-edit-button">
            <h1>{user.name}</h1>
            <button onClick={openEditForm}>
              <EditIcon />
            </button>
          </div>

          <div className="companion-bio">
            <h2>Companion {user.companion}</h2>
          </div>
          <p className="bio">Bio: {user.bio}</p>
        </div>
      </div>
      <div className="usersPosts">
          {
            usersPosts.map((post) => (
              <div key={post._id} className="each-post">
                <Post post={post} />
              </div>
            ))
          }
      </div>
    </div>
  );
};

export default Profile;
