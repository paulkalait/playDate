import React, { useState } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { signin, signUp } from "../../actions/auth.js";
import BACKGROUND from "../../assets/images/auth-login-walking.svg";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //base on the change of the variable change the tittle and inputs to reflect
  const [formData, setFormData] = useState(initialState);

  const [isSignup, setIsSignUp] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const switchAuth = () => {
    setShowPassword(false);
    setIsSignUp((isSignup) => !isSignup);
  };
  //toggle the password to on and off
  const handleShowPassword = () =>
    setShowPassword((previousShowPassword) => !previousShowPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.confirmPassword !== formData.password) {
      setPasswordError("Passwords must match");
    }
    if (formData.password.length < 5) {
      setPasswordLengthError("Password must be minimum 5 characters long");
    }
    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  return (
    <div className=".container">
      <div className="auth-image">
        <img src={BACKGROUND} alt="cartoonwalkingdog" />
      </div>

      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit} autocomplete="off">
          <div className="signup-text-div">
            <h1>{isSignup ? "Sign up" : "Sign In"}</h1>
          </div>
          <div>
            {isSignup && (
              <div>
                <Input
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  handleChange={handleChange}
                  autocomplete="false"
                />

                <Input
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  handleChange={handleChange}
                  autocomplete="false"
                />
              </div>
            )}

            <Input
              name="email"
              placeholder="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autocomplete="false"
            />

            <Input
              name="password"
              placeholder="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              autocomplete="false"
            />

            {isSignup && (
              <Input
                name="confirmPassword"
                placeholder="repeat password"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                autocomplete="false"
              />
            )}
            {passwordError.length > 0 && (
              <div className="password-error-container">
                <span className="password-error">Passwords must match!</span>
              </div>
            )}
            {passwordLengthError.length > 0 && (
              <div className="password-error-container">
                <span className="password-error">
                  Password must be minimum 5 characters long
                </span>
              </div>
            )}
          </div>

          <div className="auth-form-button-containers">
            <span className="span-container">
              {isSignup ? "Already Have an account?" : "Dont Have an Account?"}
              <button onClick={switchAuth} id="dont-have-account-btn">
                {" "}
                {isSignup ? "Sign In" : " Sign Up"}{" "}
              </button>
            </span>

            <button type="submit" className="auth-buttons">
              {" "}
              {isSignup ? "Sign Up" : "Sign In"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
