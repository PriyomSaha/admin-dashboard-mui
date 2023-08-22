import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import { theme } from "Components/UI/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(true);

  useEffect(() => {
    setIsPassMatch(true);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsPassMatch(false);
      setIsSubmitting(false); // Set it to false here
    } else {
      setIsSubmitting(true);
      // Simulate an asynchronous operation with a delay
      setTimeout(async () => {
        // Perform your actual asynchronous operations here
        // For example, API calls or other async tasks

        setIsSubmitting(false); // Stop the circular progress
      }, 2000); // Delay for 2 seconds (adjust as needed)
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
            Reset Password
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Both the passwords should match
          </Typography>
        </Box>
        <Box noValidate sx={{ mt: 3 }}>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              label={"New Password"}
            />
            <PasswordInput
              password={confirmPassword}
              setPassword={setConfirmPassword}
              label={"Confirm Password"}
            />
            {isPassMatch ? null : (
              <Typography color={"error"}>Passwords Not Matching</Typography>
            )}
            <Box m={2} />
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
                Resetting...
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
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1,
                  ":hover": {
                    background: theme.palette.grey[800],
                  },
                }}
              >
                Reset
              </Button>
            )}
          </form>
        </Box>
      </Paper>
    </>
  );
}

export default ResetPassword;
