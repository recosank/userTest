import React from "react";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const CustomSelectInput = ({
  data,
  label,
  helperText,
  value,
  onChange,
  name,
}) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      sx={{ width: "100%", backgroundColor: "#F8EEE7" }}
      value={value}
      required
      name={name}
      onChange={(e) => onChange(e)}
      label={label}
      helperText={helperText}
      FormHelperTextProps={{
        style: {
          backgroundColor: "#f4decb",
          padding: "1% 4%",
          margin: "0",
        },
      }}
    >
      {data.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelectInput;
