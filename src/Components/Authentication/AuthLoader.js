import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import LOGO from "Components/UI/Images/logo.gif";

function AuthLoader() {
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
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
          <Box
            variant="h4"
            display={"flex"}
            justifyContent={"center"}
            py={2}
            fontWeight={600}
          >
            <img src={LOGO} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default AuthLoader;
