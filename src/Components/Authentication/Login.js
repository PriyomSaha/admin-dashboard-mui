import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { theme } from "Components/UI/themes";
import { useNavigate } from "react-router-dom";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { useAccountStore } from "Components/Assets/StateManagement";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // State to hold user input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to indicate whether there's an error in the form
  const [havingError, setHavingError] = useState(false);

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accessing user data from global state
  const setUserData = useAccountStore((state) => state.setUserData);

  // API endpoints
  const url = "/auth/token";
  const urlUserDetails = "/api/v1/userDetails";

  // Clear error status when password or email changes
  useEffect(() => {
    setHavingError(false);
  }, [password, email]);

  // Handle user login
  const handleLogin = async () => {
    await setIsSubmitting(true);

    // Validate email and password
    if (password.length < 8 || !email.includes(".", "@")) {
      await setHavingError(true);
    } else {
      try {
        await setHavingError(false);

        // Call authentication API to get token
        const resp = await axios.post(url, {
          username: email,
          password: password,
        });

        // Get user data using token
        handleGetUserdata(resp.data);
      } catch (error) {
        setHavingError(true);
      }
    }
    await setIsSubmitting(false);
  };

  // Get user details based on token
  const handleGetUserdata = async (bToken) => {
    try {
      const response = await axios.post(
        urlUserDetails,
        {
          username: email,
        },
        {
          headers: {
            Authorization: `Bearer ${bToken}`,
          },
        }
      );
      // Update user data in global state
      setUserData(response.data, true);
    } catch (error) {
      setHavingError(true);
    }
  };

  return (
    <>
      <Paper
        elevation={5}
        sx={{ padding: 2, width: "100%", bgcolor: theme.palette.grey[100] }}
      >
        <Box display="flex" flexDirection="column" justifyContent={"center"}>
          {/* Login Header */}
          <Typography
            component="h1"
            variant="h5"
            fontWeight={600}
            letterSpacing={1}
          >
            Login
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Enter your details to access the account
          </Typography>
        </Box>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          {/* Email Input */}
          <EmailInput
            email={email}
            setEmail={setEmail}
            setHavingError={setHavingError}
          />

          {/* Password Input */}
          <PasswordInput
            password={password}
            setPassword={setPassword}
            needStrengthValidation={false}
          />

          {/* Conditional Rendering based on form submission status */}
          {isSubmitting ? (
            // Display progress indicator while submitting
            <Button
              disabled
              fullWidth
              variant="contained-dark"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                p: 1,
                ":hover": {
                  background: theme.palette.grey[800],
                },
              }}
            >
              Accessing...
              <CircularProgress
                size={20}
                sx={{
                  color: "var(--header-nav-text)",
                  ml: 2,
                }}
              />
            </Button>
          ) : (
            // Display login button when not submitting
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained-dark"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                p: 1,
                ":hover": {
                  background: theme.palette.grey[800],
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Paper>

      {/* Forgot Password Link */}
      <Typography py={2}>
        Forgot Password?{" "}
        <span
          onClick={() => navigate("/forgotpassword")}
          style={{ cursor: "pointer", color: "var(--links)" }}
        >
          Click Here
        </span>
      </Typography>

      {/* Display error message in a Snackbar */}
      <Snackbar
        open={havingError}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled">
          Please check your credentials !!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
