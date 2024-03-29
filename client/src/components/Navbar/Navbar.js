import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import EditIcon from "@material-ui/icons/Edit";
import LOGOUT from "../../assets/images/log-out.svg"
import AVATAR from "../../assets/images/account-logo.svg";
import CHAT from  "../../assets/images/chat-logo.svg"

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      //if the coded token in millicends is lower than the current time
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));

    //when location changes...set the user
  }, [location, dispatch, user?.token]);
  const getProfile = () => {
    history.push(`/user/${user.result._id}`);
  };
  //  <img alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</img>
  return (
    <div className="header-container">
      <header className="header" component={Link} to="/">
        <Link to="/posts">
          <div className="logo-div"></div>
        </Link>

        <nav>
          {user ? (
            <div className="login-div">
              <div className="avatar-div">
                <img src={AVATAR} alt="userprofileimage" className="avatar" />

                <div className="account">
                  <div className="select-account">
                    <div className="absolute-tip-for-account"></div>
                    <div className="edit-account-div" onClick={getProfile}>
                      <h4>{user.result.name}</h4>
                      <button className="edit-icon-container">
                        <EditIcon />
                      </button>
                    </div>
                    <div className="edit-account-div" onClick={logout}>
                      <h4>Logout</h4>
                      <img src={LOGOUT} alt="logoutIcon" className="avatar" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-div">
                <Link to="/chat"className="avatar-div">
                <img src={CHAT} alt="chatLogo" className="avatar" />
                </Link>
              </div>
            </div>
          ) : (
            <button className="signin-btn">
              <Link to="/auth" className="signin-btn-link">
                Sign In
              </Link>
            </button>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
