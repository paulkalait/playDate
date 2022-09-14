import React from "react";
import { fetchPostByMostPopular} from "../../actions/posts";
import { fetchPosts } from "../../api/index.js";
import { useDispatch } from "react-redux";
import star from "../../../src/assets/images/star.svg";
// import './FilterBySize.css'

const FilterByPopular = () => {
  const dispatch = useDispatch();

  const filterPopular = (e) => {
    if(e.target.value === "twentyFourHours") dispatch(fetchPostByMostPopular("twentyFourHours"));
    if(e.target.value === "sevenDays") dispatch(fetchPostByMostPopular("sevenDays"));
    if(e.target.value === "allTime") dispatch(fetchPostByMostPopular("allTime"));
dispatch(fetchPosts)
  };

  return (
    <div className="filter-container-parent">
      <div className="filter-container">
     
     <span>Popular</span>
     <img src={star}/>
 </div>
    <div className="filter-container-options">
        <button onClick={filterPopular} value="twentyFourHours">
          Today
        </button>
        <button onClick={filterPopular} value="sevenDays">
          This Week
        </button>
        <button onClick={filterPopular} value="allTime">
          All Time
        </button>
      </div>
    </div>
  
  );
};

export default FilterByPopular;
