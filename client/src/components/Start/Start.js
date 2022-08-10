import React from "react";
import Auth from "../Auth/Auth";
import "./style.css";
import SOCIAL from "../../assets/images/Social.svg";
const Start = () => {
  return (
    <div className="start-container">
      {/* INTRO */}
      <div className="intro slide-one">
        <div className="photo-side">
          <img src={SOCIAL} alt="peopleconnecting" />
        </div>
        <div className="text-side">
          <h1>PlayDate</h1>
          <p>A site for ... </p>
        </div>
      </div>
      {/* INTRO ENDs */}

      {/* WHERE YOU CAN */}
      <div className="intro slide-two">
        <div className="text-side">
            <div className="slide-two-text">
            <span>Where You can...</span>
          <span className="meet">Meet  Friends</span>
          <span>Share Photos</span>
          <div className="give-a-treat-text">
          <span>Give a </span> <span className="treat-text"> Treat</span>
          </div>
          
            </div>
          
        </div>
        <div className="photo-side"></div>
      </div>
      {/* WHER YOU CAN ENDs */}

      {/* JOIN THE COMMUNITY */}
      <div className="intro slide-three">
        <Auth />
      </div>

      {/* JOIN THE COMMUNITY ENDS */}
    </div>
  );
};

export default Start;
