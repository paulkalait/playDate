import React, { useState, useEffect} from "react";
import "./styles.css";
import Filebase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from 'react-redux'

const Form = ({ currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    name: "",
    title: "",
    //will be a dropdown
    size: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>  currentId ? state.posts.find((postToUpdate) => postToUpdate._id === currentId) : null)
  const dispatch = useDispatch();

  //if there is a post id that will be updated then set the form data to its values to be updated
  useEffect(() => { if(post){setPostData(post)}}, [post])


  const clear = () => {
   
    setCurrentId(0)
    setPostData({
      name: "",
      title: "",
      //will be a dropdown
      size: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };


  return (
// got rid of the onSubmit handler on the form tag
    <div className="formContainer">
    
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h1>{currentId ? 'Edit Post of' : 'Post your'} Companion</h1>{" "}
        {/* use spread operator to only affect name in this field*/}
        <input
          name="name"
          variant="outlined"
          placeholder="Name"
          value={postData.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <input
          name="title"
          variant="outlined"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <input
          name="tags"
          variant="outlined"
          placeholder="Tags"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(', ')})}
        />
        
        <select
          value={postData.size}
          onChange={(e) => setPostData({ ...postData, size: e.target.value })}
        >
        <option>select size</option>
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
        <div className="buttonContainer">
          <button className="submit-button" type="submit">Submit</button>
          <button className="clear-button" onClick={clear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
