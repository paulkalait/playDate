import React, { useEffect, useState} from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../api";

const UserProfileForm = ({ userId, show, close , setUserId}) => {
  const user = useSelector((state) => (userId ? state.user.find((user) => user._id === userId): null))
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    companion: "",
    bio: "",
    userImage: "",
  });
  const userStorage = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if(user) setUserData(user)
  }, [user, userId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, { ...userData, name: userStorage?.result.name }));
  };

  if(!show){
    return null
  }
  return (
    <div className="model-container-father">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
              setUserData({ ...userData, UserImage: base64 })
            }
            className="filebase"
          />
          <button type="submit" className="submit-button">
            Save
          </button>
          <button onClick={close}>
            Close
          </button>
    
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
