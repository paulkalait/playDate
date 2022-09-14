import React, { useState } from "react";
import { fetchPostBySize } from "../../actions/posts";
import { fetchPosts } from "../../api/index.js";
import { useDispatch } from "react-redux";
import dog from "../../../src/assets/images/doglogo.png";
import "./FilterBySize.css";

const FilterBySizeOption = () => {
  const [size, setSize] = useState({
    small: "small",
    medium: "medium",
    large: "large",
  });
  const dispatch = useDispatch();
  const filterSize = (e) => {
    if (e.target.value === size.small) dispatch(fetchPostBySize(size.small));
    if (e.target.value === size.medium) dispatch(fetchPostBySize(size.medium));
    if (e.target.value === size.large) dispatch(fetchPostBySize(size.large));
    dispatch(fetchPosts);
  };

  return (
    <div className="filter-container-parent">
      <div className="filter-container">
        <span>size</span>
        <img src={dog} />
      </div>

      <div className="filter-container-options">
        <button onClick={filterSize} value={size.small}>
          small
        </button>
        <button onClick={filterSize} value={size.medium}>
          medium
        </button>
        <button onClick={filterSize} value={size.large}>
          large
        </button>
      </div>
    </div>
  );
};

export default FilterBySizeOption;
