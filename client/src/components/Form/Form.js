import React, { useState } from "react";
import "./styles.css";
import Filebase from "react-file-base64";
import { useDispatch } from "react-redux";

const Form = () => {
  const [postData, setPostData] = useState({
    name: "",
    title: "",
    //will be a dropdown
    size: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  
  const dispatch = useDispatch()

  const handleSubmit = () => {};

  const clear = () => {}
  return (
    <div className="formContainer">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h1>Post your companion</h1>{" "}
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
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <input
          name="message"
          variant="outlined"
          placeholder="Message"
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <input
          name="tags"
          variant="outlined"
          placeholder="Tags"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <select
          value={postData.size}
          onChange={(e) => setPostData({ ...postData, size: e.target.value })}
        >
          <option>small</option>
          <option>medium</option>
          <option>large</option>
        </select>
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
          <button className="submit-button">Submit</button>
          <button className="clear-button"  onClick={clear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
