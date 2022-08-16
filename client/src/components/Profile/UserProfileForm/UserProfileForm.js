import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../../api";
import './style.css'

const UserProfileForm = ({ userId, show, close, setUserId }) => {
  const { user } = useSelector((state) => state.user || {});
  console.log("user", user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    companion: "",
    bio: "",
    userImage: "",
  });
  // const userStorage = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (user) setUserData(user);
    setUserId(user._id);
  }, [user, userId, dispatch, setUserId]);

  const handleSubmit = async (e) => {
e.preventDefault()
    try {
      dispatch(updateUser(userId, { ...userData, username: user.name }));
    } catch (error) {
      console.log(error);
    }
    close()
  };

  if (!show) {
    return null;
  }
  return (
    <div className="model-containers-father">

  
    <div className="model-container-father">
      <form autoComplete="off" noValidate onSubmit={handleSubmit} className="userform">
        <div>
        <h1>Edit Profile</h1>
        <input
          name="name"
          placeholder="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          name="companion"
          placeholder="companion name"
          value={userData.companion}
          onChange={(e) =>
            setUserData({ ...userData, companion: e.target.value })
          }
        />
        <textarea
          name="bio"
          placeholder="Tell us about yourself"
          value={userData.bio}
          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
        />
        <div className="input-file">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setUserData({ ...userData, userImage: base64 })
            }
            className="filebase"
          />
        </div>
        </div>
        <div className='buttonContainer'>
        <button type="submit" className="purchase-button" >
            Save
          </button>
          <button onClick={close} className='cancel-button'>Close</button>
          </div>
      </form>
    </div>
    </div>
  );
};

export default UserProfileForm;
