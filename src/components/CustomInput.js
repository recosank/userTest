import React from "react";

import TextField from "@mui/material/TextField";

const CustomInput = ({
  label,
  value,
  onChange,
  name,
  helperText,
  errorText,
}) => {
  return (
    <TextField
      sx={{ width: "100%", backgroundColor: "#F8EEE7" }}
      id="outlined-required"
      label={label}
      name={name}
      value={value}
      required
      onChange={(e) => onChange(e)}
      error={value.length > 0 && value.length < 3 ? true : false}
      helperText={
        value.length == 0 || value.length >= 3
          ? `${helperText}`
          : `${errorText}`
      }
      FormHelperTextProps={{
        style: {
          backgroundColor: "#f4decb",
          padding: "1% 3%",
          margin: "0",
        },
      }}
    />
  );
};

export default CustomInput;
