import dog from "./assets/images/dog.svg";
import Posts from "../src/components/Posts/Posts";
import Form from "../src/components/Form/Form";
import "./App.css";
import { getPosts } from "./actions/posts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  //reassign as useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    //call dispatch and call the exported getPosts function
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <header className="header">
        <h1>play<span className="date">Date</span></h1>
        <img src={dog} alt="doglogo" />
      </header>

      <div className="father">
        <div className="div-for-posts-and-form">
          <div className="Posts-container">
            <Posts />
          </div>
          <div className="Form-container">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
