import { IconButton, InputAdornment } from "@material-ui/core";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({ name, label, type, autoFocus, handleShowPassword, handleChange }) => {
  return (
    <div>
      <input
        name={name}
        onChange={handleChange}
        required
        autoFocus
        label={label}
        type={type}
        inputprops={
          name === "password" ? {
            endAdorment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          } : null
        }
      />
    </div>
  );
};

export default Input;
