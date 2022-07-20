import React, { useState } from "react";
import "./styles.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import loginPhoto from "../../assets/images/auth-login-walking.svg";
import Input from "./Input";
const Auth = () => {
    //base on the change of the variable change the tittle and inputs to reflect

  const [isSignup, setIsSignUp] = useState(false)


  const [showPassword, setShowPassword] = useState(false)

  const switchAuth = () => {
    setShowPassword(false) 
    setIsSignUp(( hpreviousSignState) => !isSignup)
}
  //toggle the password to on and off
  const handleShowPassword = () => setShowPassword((previousShowPassword) => !previousShowPassword)

  const handleChange = () => {};

  const handleSubmit = () => {};
  return (
    <div className=".container">
      <div className="auth-image"></div>

      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h3>{isSignup ? "Sign up" : "Sign In"}</h3>
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
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </div>

          <div>
          <button type="submit" > {isSignup ? 'Sign Up' : 'Sign In'} </button>


          <button onClick={switchAuth}> {isSignup ? 'Already Have an account? Sign In' : 'Sign In'} </button>
          
          </div>
         
           
        </form>
      </div>
    </div>
  );
};

export default Auth;
