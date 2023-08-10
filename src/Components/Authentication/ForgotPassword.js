import { Box, Button, Paper, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidChevronLeft } from "react-icons/bi";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to your Express.js server
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // Handle response as needed (e.g., show success message or error)
    } catch (error) {
      console.error("Error sending reset request:", error);
    }
  };

  return (
    <>
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
      </>
    </>
  );
}
