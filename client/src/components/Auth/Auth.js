import React, { useState } from "react";
import "./styles.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import loginPhoto from "../../assets/images/auth-login-walking.svg";
import Input from "./Input";
const Auth = () => {
  //base on the change of the variable change the tittle and inputs to reflect

  const [isSignup, setIsSignUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const switchAuth = () => {
    setShowPassword(false);
    setIsSignUp((hpreviousSignState) => !isSignup);
  };
  //toggle the password to on and off
  const handleShowPassword = () =>
    setShowPassword((previousShowPassword) => !previousShowPassword);

  const handleChange = () => {};

  const handleSubmit = () => {};
  return (
    <div className=".container">
      <div className="auth-image"></div>

      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>{isSignup ? "Sign up" : "Sign In"}</h1>
          <div>
            {!isSignup && (
              <div>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                />

                <Input
                  name="firstName"
                  label="First Name"
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
            <button type="submit" className="auth-buttons">
              {" "}
              {isSignup ? "Sign Up" : "Sign In"}{" "}
            </button>

            <span className="span-container">
              {isSignup ? "Already Have an account?" : "Dont Have an Account?"}
              
            </span>
            <button onClick={switchAuth} className="auth-buttons">
                {" "}
                {isSignup ? "Sign In" : " Sign Up"}{" "}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
