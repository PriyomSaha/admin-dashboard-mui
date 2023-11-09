import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function EmailInput({ email, setEmail }) {
  const [emailError, setEmailError] = useState("");

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (input && !emailRegex.test(input)) {
      return "Invalid email address";
    } else {
      return "";
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail.toLowerCase());
    setEmailError(validateEmail(newEmail));
  };

  return (
    <TextField
      // margin="normal"
      required
      fullWidth
      label="Email"
      autoComplete="email"
      // autoFocus
      size="small"
      value={email}
      onChange={handleEmailChange}
      error={!!emailError}
      helperText={
        <Typography color="error" display={"flex"} alignItems={"center"}>
          {emailError}
        </Typography>
      }
    />
  );
}

export default EmailInput;
