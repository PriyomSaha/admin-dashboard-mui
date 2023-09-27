import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  Stack,
} from "@mui/material";
import { theme } from "Components/UI/themes";
import { useNavigate } from "react-router-dom";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { useAccountStore } from "Components/Assets/StateManagement";
import axios from "axios";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";

const Login = () => {
  const navigate = useNavigate();

  // State to hold user input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to control whether the Snackbar is shown or hidden
  const [showSnackbar, setShowSnackbar] = useState(false);
  // State to store the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State to store the type of Snackbar, which can be 'success' or 'error'
  const [snackbarType, setSnackbarType] = useState(""); // 'success' or 'error'

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accessing user data from global state
  const setUserData = useAccountStore((state) => state.setUserData);

  // API endpoints
  const tokenUrl = process.env.REACT_APP_TOKEN_URL;
  const userDetailsUrl = process.env.REACT_APP_USER_DETAILS_URL;

  // Clear error status when password or email changes
  useEffect(() => {
    setShowSnackbar(false);
  }, [password, email]);

  // Handle user login
  const handleLogin = async () => {
    await setIsSubmitting(true);

    // Validate email and password
    if (password.length < 2 || !email.includes(".", "@")) {
      // Display error in a Snackbar
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage(
        password.length < 1 || email.length < 1
          ? "Email/Password field cannot be blank"
          : "Invalid email"
      );
    } else {
      try {
        await setShowSnackbar(false);

        // Call authentication API to get token
        const resp = await axios.post(tokenUrl, {
          username: email,
          password: password,
        });

        // Get user data using token
        handleGetUserdata(resp.data);

        // Show success notification in a Snackbar
        setShowSnackbar(true);
        setSnackbarType("success");
        setSnackbarMessage("Login successful! You are now logged in.");
      } catch (error) {
        // Show error notification in a Snackbar
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Please recheck your credentials!!");
      }
    }
    await setIsSubmitting(false);
  };

  // Get user details based on token
  const handleGetUserdata = async (bToken) => {
    try {
      const response = await axios.post(
        userDetailsUrl,
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
      // Show error notification in a Snackbar
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Failed to retrieve user data");
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
          <EmailInput email={email} setEmail={setEmail} />

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

      {/* Display error or success message in a Snackbar */}
      <ToastAlert
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
};

export default Login;
