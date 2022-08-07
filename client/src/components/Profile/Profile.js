import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/user";
import { useParams } from "react-router-dom";
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import EditIcon from "@material-ui/icons/Edit";
import UserProfileForm from "./UserProfileForm/UserProfileForm";
import AVATAR from "../../assets/images/account-logo.svg";
import "./style.css";

const Profile = () => {
  const [userId, setUserId] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useSelector((state) => state.user || {});
  console.log(user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const openEditForm = () => {
    setShowEditModal(!showEditModal);
  };
  const closeEditForm = () => {
    setShowEditModal(false);
  };
  return (
    <div className="profile-container">
      <UserProfileForm
        show={showEditModal}
        close={closeEditForm}
        userId={userId}
        setUserId={setUserId}
      />
      <div className="back-to-home">
        <div className="back-to-home-div">
        <ArrowBack style={{color: "rgb(57, 57, 57)"}}/>
        <span className="span">Back to home</span>
        </div>
       
      </div>
      <div className="user-container">
        <div className="image-container">
          {user.userImage ? (
            <img src={user.userImage} className="profile-photo" />
          ) : (
            <img src={AVATAR} className="profile-photo" />
          )}
        </div>
        <div className="user-info-container">
          <div className="username-and-edit-button">
            <h1>{user.name}</h1>
            <button onClick={openEditForm}>
              <EditIcon />
            </button>
          </div>

          <h2>Companion: {user.companion}</h2>
          <p className="bio">Bio: {user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
