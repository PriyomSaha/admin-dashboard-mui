import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { theme } from "Components/UI/themes";
import Countries from "Components/Assets/ReusableComp/Countries";
import MerchantCategory from "./MerchantCategory";
import OrderType from "./OrderType";

function MerchantDetails() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  return (
    <>
      <Typography variant="h6"> Merchant Details</Typography>
      <Typography variant="h7" color={theme.palette.grey[700]}>
        Customers will use these details to find you and contact you.
      </Typography>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 1,
          p: 2,
          mt: 1,
          background: theme.palette.grey[100],
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Select Language</InputLabel>
              <Select label="Select Language">
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
              </Select>
            </FormControl>
            <Grid container item xs={12} style={{ marginTop: "20px" }}>
              <TextField
                fullWidth
                label="Merchant Name*"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} rowSpan={2}>
            <TextField
              fullWidth
              label="Merchant Address*"
              variant="outlined"
              multiline
              rows={4}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Countries country={country} setCountry={setCountry} />
          </Grid>
          <Grid item xs={12} sm={6}>
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
        <Grid container my={1} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Merchant State"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Merchant City"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Delivery By</InputLabel>
              <Select label="Delivery By">
                <MenuItem value="merchant">Merchant</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Status</InputLabel>
              <Select label="Status">
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MerchantCategory />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderType />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default MerchantDetails;
