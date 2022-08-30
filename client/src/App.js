import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import React from "react";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails.js";
import Profile from "./components/Profile/Profile";
import Start from "./components/Start/Start.js";
import Chat from "./components/Chat/Chat";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <div className="app-div">
        <Navbar />
        <Switch>
          {/* if localhost:3000/ it will redirect to localhost:3000/posts  */}
          <Route path="/" exact component={() => <Redirect to="/start" />} />
          <Route path="/start" exact component={Start} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />

          {/* dont let a signed in user navigate to the auth component or start component */}
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
          <Route
            path="start"
            exact
            component={() => (!user ? <Start /> : <Redirect to="/posts" />)}
          />
          <Route path="/user/:id" exact component={Profile} />
          {/* <Route path="/chat" exact component={() => (user ? <Chat /> : <Redirect to="/start" />)} /> */}
          <Route path="/chat" exact component={Chat} />
          <Route path="/user/search" exact component={Chat} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
