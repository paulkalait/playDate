
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({ name,   autocomplete, label, type, placeholder, handleShowPassword, handleChange }) => {
  return (
    <div>
      <input
        name={name}
        onChange={handleChange}
        required
        autocomplete
        placeholder={placeholder}
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
