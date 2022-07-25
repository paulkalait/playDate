import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Form from "../Form/Form.js";
import { getPosts, getPostBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Posts from "../Posts/Posts.js";
import Paginate from "../Pagination.js";
import "./styles.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  //where we will get page info from
  const query = useQuery();
  const history = useHistory();
  //this will read our URL and see if we include page in there or if we dont have a page then we are on the first page
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  //if we dont have a selected id selected then its null
  const [currentId, setCurrentId] = useState(0);

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  //reassgn as useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    //call dispatch and call the exported getPosts function
    dispatch(getPosts());
    //as soon as we change the currentid the app will dispatch the getPosts so we get the latest updated posts on the homepage
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const searchPost = () => {
    if (search.trim()) {
      //converts the array to the string with a comma
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
    } else {
      history.push("/");
    }
  };

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tags) => tags !== tagToDelete));
  return (
    <>
      <nav className="search-nav">
        <div>
        <input
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
<button onClick={searchPost}> Search</button>
        </div>
      
        <ChipInput
          value={tags}
          onAdd={handleAdd}
          onDelete={handleDelete}
          label="Search Tags"
        />
        
      </nav>

      <div className="father">
        <div className="div-for-posts-and-form">
          <div className="Posts-container">
            <Posts setCurrentId={setCurrentId} />
          </div>

          <div className="Form-container">
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <div>
              {/* Import Pagination */}
              <Paginate />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
