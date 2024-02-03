import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAccountStore } from "Components/Assets/StateManagement";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { getCookie } from "Components/Assets/UIServices";
import axios from "axios";
import AuthLoader from "Components/Authentication/AuthLoader";

function MinimalLayout() {
  // Accessing user data from global state
  const userData = useAccountStore((state) => state.userData);
  // Use the custom state management hook to set user data
  const setUserData = useAccountStore((state) => state.setUserData);

  const [gettingUserData, setGettingUserdata] = useState(false);

  const userDetailsUrl =
    process.env.REACT_APP_BASE_URL + process.env.REACT_APP_USER_DETAILS_URL;

  useEffect(() => {
    const fetchData = async () => {
      await setGettingUserdata(true);

      // if (getCookie("ud") !== null && getCookie("email") !== null) {
      if (getCookie("email") !== null) {
        try {
          // const response = await axios.post(
          //   userDetailsUrl,
          //   {
          //     username: getCookie("email"),
          //   },
          //   {
          //     headers: {
          //       Authorization: `Bearer ${getCookie("ud")}`,
          //     },
          //   }
          // );

          await setUserData(
            getCookie("username"),
            getCookie("firstName"),
            getCookie("lastName"),
            getCookie("email"),
            getCookie("permissions"),
            true
          );
        } catch (error) {
          console.log(error);
        }
      }

      await setGettingUserdata(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {gettingUserData ? (
        <>
          <AuthLoader />
        </>
      ) : userData.authStatus ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Typography
                variant="h4"
                display={"flex"}
                justifyContent={"center"}
                py={2}
                fontWeight={500}
              >
                LOGO
              </Typography>
              <Outlet />
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default MinimalLayout;
