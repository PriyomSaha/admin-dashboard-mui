import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

import { theme } from "Components/UI/themes";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import PhoneInput from "react-phone-input-2";
import Countries from "Components/Assets/ReusableComp/Countries";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  // API endpoint for registration
  const registerUrl = process.env.REACT_APP_REGISTER_URL;

  // State to hold user input values
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to indicate whether there's an error in the form
  const [havingError, setHavingError] = useState(false);

  // Handle user registration
  const handleRegister = async () => {
    await setIsSubmitting(true);
    // Validate email,phoneNumber,firstName,lastName and password
    if (
      password.length < 8 ||
      !email.includes(".", "@") ||
      phoneNumber.length < 8 ||
      firstName < 2 ||
      lastName < 2
    ) {
      await setHavingError(true);
    } else {
      try {
        // Call registration API with user data
        const resp = await axios.post(registerUrl, {
          firstName: firstName,
          lastName: lastName,
          country: country,
          phoneNumber: phoneNumber,
          password: password,
          username: email,
        });
        await console.log(resp);
        navigate("/login");
      } catch (error) {
        setHavingError(true);
        await console.log(error);
      }
    }
    await setIsSubmitting(false);
  };

  // Clear error status when input values change
  useEffect(() => {
    setHavingError(false);
  }, [phoneNumber, password, firstName, lastName, email]);

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
        <Box noValidate sx={{ mt: 3 }}>
          {/* Input fields */}
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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

export default Register;
