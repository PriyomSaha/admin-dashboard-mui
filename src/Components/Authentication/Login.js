import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import { theme } from "Components/UI/themes";
import { useNavigate } from "react-router-dom";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import {
  useAccountStore,
  useSnackbarStore,
} from "Components/Assets/StateManagement";
import axios from "axios";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";
import { getCookie, setCookie } from "Components/Assets/UIServices";

const Login = () => {
  const navigate = useNavigate();

  // State to hold user input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accessing user data from global state
  const setUserData = useAccountStore((state) => state.setUserData);

  // Accessing alert snackbar data from global state
  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);

  // API endpoints

  const loginUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_LOGIN_URL;

  const refreshTokenUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_REFRESH_TOKEN_URL;

  const API_KEY = process.env.REACT_APP_API_KEY;

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
        const requestBody = {
          email: email,
          password: password,
        };
        const requestHeader = {
          "X-API-Key": API_KEY,
        };

        const resp = await axios.post(loginUrl, requestBody, {
          headers: requestHeader,
          withCredentials: true,
        });

        // const setCookieHeader = resp.headers.get("Set-Cookie");
        // console.log(setCookieHeader);
        // if (setCookieHeader) {
        //   // Set the cookie in the document's cookie storage
        //   document.cookie = setCookieHeader;

        //   // Now you can access the cookie value
        //   const yourCookieValue = getCookie("__Host-refresh_token");

        //   // Do something with the cookie value
        //   console.log("Your cookie value:", yourCookieValue);
        // }

        if (!resp.data.error) {
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);

          const respData = resp.data.data;
          sessionStorage.setItem("accessToken", respData.access_token);

          setCookie("username", respData.user.username, 7);
          setCookie("firstName", respData.user.profile.firstName, 7);
          setCookie("lastName", respData.user.profile.lastName, 7);
          setCookie("email", respData.user.email, 7);
          const permissionsJson = respData.user.profile.roles.permissions.map(
            (permission) => JSON.stringify(permission)
          );
          const joinedPermissions = permissionsJson.join(";");
          const encodedPermissions = encodeURIComponent(joinedPermissions);
          setCookie("permissions", encodedPermissions, 7);
          setCookie("role", respData.user.profile.roles.name);
          setCookie("uid", respData.user.id);

          setUserData(
            respData.user.username,
            respData.user.profile.firstName,
            respData.user.profile.lastName,
            respData.user.email,
            encodedPermissions,
            respData.user.profile.roles.name,
            true
          );
        }
        // const refreshTokenResp = await axios.get(refreshTokenUrl, {
        //   withCredentials: true,
        //   headers: requestHeader,
        // });

        // let i = async () => {
        //   const requestOptions = {
        //     method: "GET",
        //     credentials: "include",
        //     headers: requestHeader,
        //   };

        //   fetch(refreshTokenUrl, requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //       if (data.access_token) {
        //         // setJWTToken(data.access_token);
        //         // toggleRefresh(true);
        //       }
        //     })
        //     .catch((error) => {
        //       console.log("user is not logged in", error);
        //     });
        // };
        // await i();

        // console.log(refreshTokenResp);
        // Show success notification in a Snackbar
      } catch (error) {
        // Show error notification in a Snackbar
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Please recheck your credentials!!");
      }
    }
    await setIsSubmitting(false);
  };

  // // Get user details based on token
  // const handleGetUserdata = async (bToken) => {
  //   try {
  //     const response = await axios.post(
  //       userDetailsUrl,
  //       {
  //         username: email,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${bToken}`,
  //         },
  //       }
  //     );
  //     // Update user data in global state
  //     await setUserData(
  //       response.data.userName,
  //       // email
  //       response.data.authStatus
  //     );
  //     await setCookie("ud", bToken, 7);
  //     await setCookie("email", email, 0.1);

  //     // await getCookie("ud");
  //   } catch (error) {
  //     // Show error notification in a Snackbar
  //     setShowSnackbar(true);
  //     setSnackbarType("error");
  //     setSnackbarMessage("Failed to retrieve user data");
  //   }
  // };

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
          <Typography
            sx={{ color: theme.palette.grey[700], pt: 1, textAlign: "center" }}
          >
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
          onClick={() => navigate("/resetpassword")}
          style={{ cursor: "pointer", color: "var(--links)" }}
        >
          Click Here
        </span>
      </Typography>
    </>
  );
};

export default Login;
