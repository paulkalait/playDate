import React, { useState, useEffect } from "react";
import "./styles.css";
import Filebase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import UNLOCK from "../../assets/images/lock.svg";

const Form = ({ currentId, setCurrentId }) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("")
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    size: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();

  //retrieve from local storage in JS data structure
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post, currentId]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      size: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }
    clear();
  };

  const handleChange = (e) => {
    if(!e.target.value.length){
      setErrorMessage(`${e.target.name} required`)
    }else{
      setErrorMessage("")
    }
  }

  if (!user?.result?.name) {
    return (
      <div className="please-sign-in-div">
        <h1>
          {" "}
          Please{" "}
          <span>
            <Link to="/auth" className="sign-in-link">
              Sign in
            </Link>
          </span>{" "}
          to create and like a post
        </h1>
        <div className="sign-in-image-container">
          <img src={UNLOCK} alt="sign in to join" className="sign-in-image" />
        </div>
      </div>
    );
  }
  return (
    // got rid of the onSubmit handler on the form tag
    <div className="formContainer">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h1>{currentId ? "Edit Post of" : "Post your"} Companion</h1>{" "}
        {/* use spread operator to only affect name in this field*/}
        <input
          name="title"
          variant="outlined"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          onBlur={handleChange}
        />
        <input
          name="tags"
          variant="outlined"
          placeholder="Tags (seperate with comma)"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          onBlur={handleChange}
        />
        <select
          value={postData.size}
          onChange={(e) => setPostData({ ...postData, size: e.target.value })}
        >
          <option>Dog Size</option>
          <option>small</option>
          <option>medium</option>
          <option>large</option>
        </select>
        <textarea
          name="message"
          variant="outlined"
          placeholder="Message"
          className="message-input"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          onBlur={handleChange}
        />
        <div className="input-file">
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
            className="filebase"
          />
        </div>

            {errorMessage.length > 0 && (
               <div className="password-error-container">
                 <span className="password-error">{errorMessage}</span>
       </div>
            )}
       

        <div className="buttonContainer">
          <button className="submit-button" type="submit">
            Submit
          </button>
          <button className="clear-button" type="reset" onClick={clear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
