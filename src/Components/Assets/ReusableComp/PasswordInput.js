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
import { theme } from "Components/UI/themes";

function PasswordInput({
  password,
  setPassword,
  disabled,
  label,
  needStrengthValidation,
}) {
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
  const handlePasswordCopyPaste = (event) => {
    event.preventDefault();
    alert("Copying and pasting is not allowed in this field");
  };
  return (
    <>
      <TextField
        size="small"
        margin="normal"
        required
        fullWidth
        disabled={disabled}
        onPaste={(event) => handlePasswordCopyPaste(event)}
        onCopy={(event) => handlePasswordCopyPaste(event)}
        sx={
          disabled
            ? {
                "& .MuiInputBase-root.Mui-disabled": {
                  background: theme.palette.grey[300],
                },
              }
            : null
        }
        label={label ? label : "Password"}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
        error={needStrengthValidation ? !isValidPassword : null}
        helperText={
          needStrengthValidation
            ? !isValidPassword && (
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
                  <Typography
                    color="error"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    Password requirements not met &nbsp;
                    <AiFillInfoCircle />
                  </Typography>
                </Tooltip>
              )
            : null
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
    </>
  );
}

export default PasswordInput;
