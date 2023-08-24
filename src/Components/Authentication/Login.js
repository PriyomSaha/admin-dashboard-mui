import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { theme } from "Components/UI/themes";
import { useNavigate } from "react-router-dom";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { useAccountStore } from "Components/Assets/StateManagement";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUserData = useAccountStore((state) => state.setUserData);

  const url = "/auth/token";
  const urlUserDetails = "/api/v1/userDetails";
  // console.log(process.env.TOKEN_URL);

  const handleLogin = async (e) => {
    await e.preventDefault();
    try {
      const resp = await axios.post(url, {
        username: email,
        password: password,
      });
      handleGetUserdata(resp.data);
    } catch (error) {
      await console.log(error);
    }
  };

  const handleGetUserdata = async (bToken) => {
    try {
      axios
        .post(
          urlUserDetails,
          {
            username: email,
          },
          {
            headers: {
              Authorization: `Bearer ${bToken}`,
            },
          }
        )
        .then((response) => {
          setUserData("0", response.data, "00011133324", true);
        });
    } catch (error) {
      await console.log("Errorrrrrrr");
      await console.log(error);
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
            Login
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Enter your details to access the account
          </Typography>
        </Box>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            needStrengthValidation={false}
          />
          <Button
            fullWidth
            variant="contained-dark"
            color="primary"
            onClick={handleLogin}
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
        </Box>
      </Paper>
      <Typography py={2}>
        Forgot Password?{" "}
        <span
          onClick={() => navigate("/forgotpassword")}
          style={{ cursor: "pointer", color: "var(--links)" }}
        >
          Click Here
        </span>
      </Typography>
    </>
  );
};

export default Login;
