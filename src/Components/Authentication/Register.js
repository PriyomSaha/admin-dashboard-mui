import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";

import { theme } from "Components/UI/themes";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import PhoneInput from "react-phone-input-2";
import Countries from "Components/Assets/ReusableComp/Countries";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";

const Register = () => {
  const navigate = useNavigate();

  // API endpoint for registration
  const registerUrl = process.env.REACT_APP_REGISTER_URL;

  const location = useLocation();

  // State to hold user input values
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [uniquecode, setUniqueCode] = useState("");

  // For registering user through email link
  // Link format 'hasedString = Email+Space+Username+Space+InviteCode'
  const token = location.pathname.split("/").slice(-1);
  useEffect(() => {
    const decode = atob(token);
    const decodeArray = decode.split(" ");
    setEmail(decodeArray[0]);
    setUserName(decodeArray[1]);
    setUniqueCode(decodeArray[2]);
  }, [token]);

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // // State to indicate whether there's an error in the form
  // const [havingError, setHavingError] = useState(false);

  // State to control whether the Snackbar is shown or hidden
  const [showSnackbar, setShowSnackbar] = useState(false);
  // State to store the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State to store the type of Snackbar, which can be 'success' or 'error'
  const [snackbarType, setSnackbarType] = useState(""); // 'success' or 'error'

  // Handle user registration
  const handleRegister = async () => {
    await setIsSubmitting(true);
    // Validate email,phoneNumber,firstName,lastName and password
    if (
      password.length < 8 ||
      !email.includes(".", "@") ||
      phoneNumber.length < 8 ||
      userName < 2
    ) {
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Please check all the inputs");
    } else {
      try {
        // Call registration API with user data
        await axios.post(registerUrl, {
          userName: userName,
          country: country,
          phoneNumber: phoneNumber,
          password: password,
          username: email,
        });
        setShowSnackbar(true);
        setSnackbarType("success");
        setSnackbarMessage("User Created...Navigating to login page");
        // Delay the navigation to the login page after the toast message is closed
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Adjust the delay time as needed
      } catch (error) {
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Some error occured!!");
      }
    }
    await setIsSubmitting(false);
  };

  // Clear error status when input values change
  useEffect(() => {
    setShowSnackbar(false);
    setSnackbarType("");
    setSnackbarMessage("");
  }, [phoneNumber, password, userName, email]);

  return (
    <>
      <Paper
        elevation={5}
        sx={{ padding: 2, width: "100%", bgcolor: theme.palette.grey[100] }}
      >
        <Box display="flex" flexDirection="column" justifyContent={"center"}>
          {/* Registration Header */}
          <Typography
            component="h1"
            variant="h5"
            fontWeight={600}
            letterSpacing={1}
          >
            Create New Account
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Enter your details to accept the invitation
          </Typography>
        </Box>
        <Box noValidate sx={{ mt: 2 }}>
          {/* Input fields */}
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Your Email"
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              readOnly: true,
              disabled: true,
            }}
          />

          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Enter your User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            needStrengthValidation={true}
          />
          <Box m={2} />
          {/* Select Country */}
          <Countries country={country} setCountry={setCountry} />
          <Box m={2} />
          {/* Phone Input */}
          <PhoneInput
            country={country.toLowerCase()}
            enableSearch={true}
            countryCodeEditable={false}
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            placeHolder="Enter the phone number"
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
              Registering...
              <CircularProgress
                size={20}
                sx={{
                  color: "var(--header-nav-text)",
                  ml: 2,
                }}
              />
            </Button>
          ) : (
            // Display register button when not submitting
            <Button
              onClick={handleRegister}
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
              Register
            </Button>
          )}
        </Box>
      </Paper>
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

export default Register;
