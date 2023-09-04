import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Countries from "Components/Assets/ReusableComp/Countries";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

function SiteContactDetails() {
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("IN");

  return (
    <>
      <Grid item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Site Contact Details
          </Typography>
          <Typography>
            Customers will use these details to contact you.
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          <Paper elevation={3}>
            <Box px={4} py={3}>
              <TextField
                fullWidth
                label="Business Name"
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <EmailInput email={email} setEmail={setEmail} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Countries country={country} setCountry={setCountry} />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <PhoneInput
                    country={country.toLowerCase()}
                    enableSearch={true}
                    countryCodeEditable={false}
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    placeHolder="Enter the phone number"
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Business Address*"
                variant="outlined"
                multiline
                rows={4}
                size="small"
                sx={{ mt: 2 }}
              />
              <Grid container spacing={2} mt={0.1}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default SiteContactDetails;
