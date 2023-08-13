import React, { useState } from "react";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";
import { theme } from "Components/UI/themes";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import PhoneInput from "react-phone-input-2";
import Countries from "Components/Assets/ReusableComp/Countries";
import axios from "axios";

const Register = () => {
  const url = "/api/register";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      const resp = await axios.post(url, {
        firstName: firstName,
        lastName: lastName,
        country: country,
        phoneNumber: phoneNumber,
        password: password,
      });
      await console.log(resp);
    } catch (error) {
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
            Create New Account
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700], pt: 1 }}>
            Enter your details to accept the invitation
          </Typography>
        </Box>
        <Box noValidate sx={{ mt: 3 }}>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              label="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              label="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <PasswordInput password={password} setPassword={setPassword} />
            <Box m={2} />
            <Countries country={country} setCountry={setCountry} />
            <Box m={2} />
            <PhoneInput
              country={country.toLowerCase()}
              enableSearch={true}
              countryCodeEditable={false}
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              placeHolder="Enter the phone number"
            />
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
              Sign Up
            </Button>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default Register;
