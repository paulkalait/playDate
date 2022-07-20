import React, { useState, useEffect} from 'react'
import Form from '../Form/Form';
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Posts from '../Posts/Posts';
import './styles.css'

const Home = () => {
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
  )
}

export default Home