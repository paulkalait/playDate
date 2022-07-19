import logo from "./assets/images/PLSC.png";
import Posts from "../src/components/Posts/Posts";
import Form from "../src/components/Form/Form";
import "./App.css";
import { getPosts } from "./actions/posts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function App() {
  //if we dont have a selected id selected then its null
  const [currentId, setCurrentId] = useState(null)
  //reassign as useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    //call dispatch and call the exported getPosts function
    dispatch(getPosts());
    //as soon as we change the currentid the app will dispatch the getPosts so we get the latest updated posts on the homepage
  }, [currentId, dispatch]);

  return (
    <div>
      <header className="header">
      <div className="logo-div"></div>
     
      </header>

      <div className="father">
        <div className="div-for-posts-and-form">
          <div className="Posts-container">
            <Posts currentId={currentId}  setCurrentId={setCurrentId} />
          </div>
          <div className="Form-container">
            <Form  currentId={currentId}  setCurrentId={setCurrentId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
