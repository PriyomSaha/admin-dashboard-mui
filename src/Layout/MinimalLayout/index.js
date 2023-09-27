import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAccountStore } from "Components/Assets/StateManagement";
import { Box, Container, CssBaseline, Typography } from "@mui/material";

function MinimalLayout() {
  const userData = useAccountStore((state) => state.userData);

  return (
    <>
      {userData.authStatus ? (
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
