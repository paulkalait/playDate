
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({ name, label, type, placeholder, handleShowPassword, handleChange }) => {
  return (
    <div>
      <input
        name={name}
        onChange={handleChange}
        required
        placeholder={placeholder}
        autoFocus
        label={label}
        type={type}
        inputprops={
          name === "password" ? {
            endAdorment: (
           <span>
                <button onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </button>
            </span>
            ),
          } : null
        }
      />
    </div>
  );
};

export default Input;
