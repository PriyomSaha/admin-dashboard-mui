import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "Components/UI/themes";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OtpInput = ({
  setisOtpValidated,
  setShowSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) => {
  const otpValidationUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_OTP_VALIDATION_URL;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const interval = 5; // Time interval for resend button activation in seconds
  const [timeLeft, setTimeLeft] = useState(interval); // Initial time in seconds
  const [email, setEmail] = useState("");

  const location = useLocation();
  const token = location.pathname.split("/").slice(-1);

  useEffect(() => {
    const decode = atob(token);
    // const decode = "atob(token)";

    const decodeArray = decode.split(" ");
    setEmail(decodeArray[0]);
  }, [token]);

  // Refs to store references to each OTP input field
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  // Effect to handle the countdown timer for resend button
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        // Decrement the time left
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      } else {
        // Enable the resend button when the time is up
        setResendDisabled(false);
        // Clear the interval
        clearInterval(timerInterval);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  // Handle input change in each OTP input field
  const handleInputChange = (index, event) => {
    const value = event.target.value;

    // Allow only numeric values
    if (/[^0-9]/.test(value)) {
      return;
    }

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move focus to the next input field if a value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  // Handle backspace to move focus to the previous input field
  const handleBackspace = (index, event) => {
    if (event.key === "Backspace") {
      if (index > 0 && !otp[index]) {
        event.preventDefault();
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index - 1] = "";
          return newOtp;
        });
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  // Handle the resend button click
  const handleResend = () => {
    // Disable the resend button
    setResendDisabled(true);
    // Reset the timer
    setTimeLeft(interval);
    // Add logic to send a new OTP
  };

  // Handle the validation logic
  const handleValidation = async () => {
    setIsSubmitting(true);
    try {
      const requestBody = {
        email: email,
        otp: otp.join(""),
      };
      const requestHeader = {
        "X-API-Key": API_KEY,
      };
      const resp = await axios.post(otpValidationUrl, requestBody, {
        headers: requestHeader,
      });
      if (!resp.data.error) {
        setShowSnackbar(true);
        setSnackbarType("success");
        setSnackbarMessage(resp.data.message);
        setisOtpValidated(true);
      }
    } catch (error) {
      setisOtpValidated(false);
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the OTP input component
  return (
    <>
      <Paper
        elevation={5}
        sx={{ padding: 2, width: "100%", bgcolor: theme.palette.grey[100] }}
      >
        <Box display="flex" flexDirection="column" justifyContent={"center"}>
          {/* Heading */}
          <Typography
            component="h1"
            variant="h5"
            fontWeight={600}
            letterSpacing={1}
          >
            OTP Validation
          </Typography>
          {/* Subheading */}
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Verify with OTP on registered device
          </Typography>
        </Box>
        <Box noValidate sx={{ mt: 3 }}>
          {/* OTP Input Fields */}
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "none",
            }}
            container
          >
            {otp.map((value, index) => (
              <Grid item key={index}>
                <TextField
                  key={index}
                  sx={{ width: "2.5rem" }}
                  variant="outlined"
                  size="small"
                  placeholder={index + 1}
                  inputRef={inputRefs.current[index]}
                  value={value}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                />
              </Grid>
            ))}
          </Grid>
          <Box m={2} />
          {/* Validation Button */}
          {isSubmitting ? (
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
              Validating...
              <CircularProgress
                size={20}
                sx={{
                  color: "var(--header-nav-text)",
                  ml: 2,
                }}
              />
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained-dark"
              color="primary"
              onClick={handleValidation}
              sx={{
                mt: 3,
                mb: 2,
                p: 1,
                ":hover": {
                  background: theme.palette.grey[800],
                },
              }}
            >
              Validate
            </Button>
          )}
        </Box>
      </Paper>
      {/* Resend Button and Timer */}
      <Typography py={2}>
        Didn't you receive the OTP?{" "}
        <button
          onClick={handleResend}
          disabled={resendDisabled}
          style={{
            cursor: resendDisabled ? "not-allowed" : "pointer",
            color: "var(--links)",
            border: "none",
          }}
        >
          <b> RESEND </b>
        </button>
      </Typography>
      {/* Timer Explanation */}
      <Typography variant="body2" sx={{ mt: "-1rem" }}>
        You can click on RESEND {timeLeft > 0 ? `after ${timeLeft}s` : "now"}
      </Typography>
    </>
  );
};

export default OtpInput;
