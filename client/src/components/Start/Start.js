import React, { useEffect } from "react";
import Auth from "../Auth/Auth";
import "./style.css";
import SOCIAL from "../../assets/images/Social.svg";
import Aos from "aos"
import "aos/dist/aos.css"
import { Link } from "react-scroll";
import DOGWALK from "../../assets/images/relaxing-dog-walk.svg";
const Start = () => {
  useEffect(() => {
Aos.init({duration: 2000})
  }, [])
  return (
    <div className="start-container">
      {/* INTRO */}
      <div className="intro slide-one">
        <div className="photo-side"  >
          <img src={SOCIAL} alt="peopleconnecting"/>
        </div>
        <div className="text-side"  data-aos="fade-up">
          <div className="play-date-div">
            <h1>Play</h1>
            <h1 className="Date">Date</h1>
          </div>
          <Link to="join" smooth={true} duration={500}>
          <button className="join-now" >Join</button>
          </Link>
         
        </div>
      </div>
      {/* INTRO ENDs */}

      {/* WHERE YOU CAN */}
      <div className="intro slide-two">
        <div className="text-side">
          <div className="slide-two-text"  data-aos="fade-up">
            <span>Where You can...</span>
            <span className="meet">Meet Friends</span>
            <span>Share Photos</span>
            <div className="give-a-treat-text">
              <span>Give a </span> <span className="treat-text"> Treat</span>
            </div>
          </div>
        </div>
        <div className="photo-side">
          <img src={DOGWALK} alt="womanwalkingdog" />
        </div>
      </div>
      {/* WHER YOU CAN ENDs */}

      {/* JOIN THE COMMUNITY */}
      <div className="intro slide-three"  data-aos="fade-up" name="join">
        <Auth />
      </div>

      {/* JOIN THE COMMUNITY ENDS */}
    </div>
  );
};

export default Start;
