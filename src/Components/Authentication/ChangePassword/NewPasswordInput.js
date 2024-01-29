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
import { useLocation, useNavigate } from "react-router-dom";

function NewPasswordInput({
  setShowSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const navigate = useNavigate();

  const passwordChangeUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_PASSWORD_CHANGE_URL;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(true);

  const location = useLocation();
  const token = location.pathname.split("/").slice(-1);

  useEffect(() => {
    const decode = atob(token);
    // const decode = "atob(token)";

    const decodeArray = decode.split(" ");
    setEmail(decodeArray[0]);
  }, [token]);

  useEffect(() => {
    setIsPassMatch(true);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsPassMatch(false);
      setIsSubmitting(false); // Set it to false here
    } else {
      try {
        setIsSubmitting(true);

        const requestBody = {
          email: email,
          password: password,
        };
        const requestHeader = {
          "X-API-Key": API_KEY,
        };
        const resp = await axios.post(passwordChangeUrl, requestBody, {
          headers: requestHeader,
        });
        if (!resp.data.error) {
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);

          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      } catch (error) {
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage(error.response.data.message);
      } finally {
        setIsSubmitting(false); // Stop the circular progress
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
            Reset Password
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Both passwords should match
          </Typography>
        </Box>
        <Box noValidate sx={{ mt: 3 }}>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              label={"New Password"}
              needStrengthValidation={true}
            />
            <PasswordInput
              password={confirmPassword}
              setPassword={setConfirmPassword}
              label={"Confirm Password"}
              needStrengthValidation={true}
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

export default NewPasswordInput;
