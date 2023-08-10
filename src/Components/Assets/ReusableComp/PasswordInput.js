import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function PasswordInput({ password, setPassword }) {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (value) => {
    // Use a regular expression to validate the password format
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));
  };

  return (
    <div>
      <TextField
        size="small"
        margin="normal"
        required
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
        error={!isValidPassword}
        helperText={
          !isValidPassword && (
            <Tooltip
              title={
                <div>
                  <Typography variant="body1">Password must:</Typography>
                  <Typography variant="body2">
                    - Be at least 8 characters long
                  </Typography>
                  <Typography variant="body2">
                    - Contain at least one uppercase letter
                  </Typography>
                  <Typography variant="body2">
                    - Contain at least one lowercase letter
                  </Typography>
                  <Typography variant="body2">
                    - Contain at least one digit
                  </Typography>
                  <Typography variant="body2">
                    - Contain at least one special character (@$!%*?&)
                  </Typography>
                </div>
              }
              placement="right"
            >
              <Typography color="error" display={"flex"} alignItems={"center"}>
                Password requirements not met &nbsp;
                <AiFillInfoCircle />
              </Typography>
            </Tooltip>
          )
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {!showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default PasswordInput;
