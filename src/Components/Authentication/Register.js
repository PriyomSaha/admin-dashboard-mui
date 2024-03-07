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
import { useSnackbarStore } from "Components/Assets/StateManagement";

const Register = () => {
  const navigate = useNavigate();

  // API endpoint for registration
  const registerUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_REGISTER_URL;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const location = useLocation();

  // State to hold user input values
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);
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
        const requestBody = {
          // country: country,
          firstName: firstName,
          lastName: lastName,
          username: userName,
          password: password,
          email: email,
          phone: phoneNumber,
          inviteCode: {
            code: uniquecode,
          },
          // inviteCode: uniquecode,
        };
        const requestHeader = {
          "X-API-Key": API_KEY,
        };
        await axios.post(registerUrl, requestBody, {
          headers: requestHeader,
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
            textAlign={"center"}
          >
            Create New Account
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[700],
              pt: 1,
              textAlign: "center",
            }}
          >
            Enter your details to accept the invitation
          </Typography>
          <span
            style={{
              textAlign: "center",
              cursor: "pointer",
              color: "var(--links)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Typography variant="caption" fontWeight={700}>
              {email}
            </Typography>
          </span>
        </Box>
        <Box noValidate sx={{ mt: 0.5 }}>
          {/* Input fields */}

          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          {/* Select Country */}
          {/* <Box m={2} /> */}
          {/* <Countries country={country} setCountry={setCountry} /> */}
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
      
    </>
  );
};

export default Register;
