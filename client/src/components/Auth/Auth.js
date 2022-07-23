import React, { useState } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input";
import {signin, signUp} from '../../actions/auth.js'

const initialState = {firstName: '', lastName: '', email: '',password: '', confirmPassword: ''}

const Auth = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  //base on the change of the variable change the tittle and inputs to reflect
  const [formData, setFormData] = useState(initialState)

  const [isSignup, setIsSignUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const switchAuth = () => {
    setShowPassword(false);
    setIsSignUp((isSignup) => !isSignup);
  };
  //toggle the password to on and off
  const handleShowPassword = () =>
    setShowPassword((previousShowPassword) => !previousShowPassword);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    if(isSignup){
      dispatch(signUp(formData, history))
    }else{
      dispatch(signin(formData, history))
    }
  };
  return (
    <div className=".container">
      <div className="auth-image"></div>

      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="signup-text-div">
            <h1>{isSignup ? "Sign up" : "Sign In"}</h1>
          </div>
          <div>
            {isSignup && (
              <div>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                />
              </div>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            
            {isSignup && (
              <Input

                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </div>

          <div className="auth-form-button-containers">
            <span className="span-container">
              {isSignup ? "Already Have an account?" : "Dont Have an Account?"}
              <button onClick={switchAuth} id="dont-have-account-btn" className="">
              {" "}
              {isSignup ? "Sign In" : " Sign Up"}{" "}
            </button>
            </span>
           
            <button type="submit"  className="auth-buttons">
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
