import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidChevronLeft } from "react-icons/bi";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import axios from "axios";
import ResetPasswordNote from "./ResetPasswordNote";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";
import { useSnackbarStore } from "Components/Assets/StateManagement";

function ResetPassword() {
  const passwordResetUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_PASSWORD_RESET_URL;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate email and password
    if (!email.includes(".", "@")) {
      // Display error in a Snackbar
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage(
        "Invalid email. Please enter a valid email to continue"
      );
    } else {
      setIsSubmitting(true);
      setIsNotesOpen(true);

      try {
        const requestBody = {
          email: email,
        };
        const requestHeader = {
          "X-API-Key": API_KEY,
        };
        // Make a POST request to your server
        await axios.post(passwordResetUrl, requestBody, {
          headers: requestHeader,
        });
        // Handle response as needed (e.g., show success message or error)
        setShowSnackbar(true);
        setSnackbarType("success");
        setSnackbarMessage("Check Email for reset Link. Mobile for OTP");
      } catch (error) {
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Error sending reset request..");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Paper
        elevation={5}
        sx={{ padding: 2, width: "100%", bgcolor: theme.palette.grey[100] }}
      >
        <Box display="flex" flexDirection="column" justifyContent={"center"}>
          <Typography
            component="h1"
            variant="h5"
            fontWeight={600}
            letterSpacing={1}
          >
            Forgot Password
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Enter your email to recover the account
          </Typography>
        </Box>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <EmailInput email={email} setEmail={setEmail} />
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
              Sending...
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
              onClick={handleSubmit}
            >
              Send
            </Button>
          )}
        </Box>
      </Paper>
      <Typography
        py={2}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "var(--links)",
        }}
        onClick={() => navigate("/login")}
      >
        <BiSolidChevronLeft />
        Go back to Sign In
      </Typography>
      <ResetPasswordNote
        isNotesOpen={isNotesOpen}
        setIsNotesOpen={setIsNotesOpen}
      />
    </>
  );
}
export default ResetPassword;
