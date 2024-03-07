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
import EmailInput from "Components/Assets/ReusableComp/EmailInput";

function MerchantDetails({
  email,
  setEmail,
  name,
  setName,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  postalCode,
  setPostalCode,
  status,
  setStatus,
  orderType,
  setOrderType,
  deliveryBy,
  setDeliveryBy,
  merchantCategory,
  setMerchantCategory,
  businessType,
  setBusinessType,
}) {
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
            {/* <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Select Language</InputLabel>
              <Select
                label="Select Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
              </Select>
            </FormControl> */}
            <TextField
              fullWidth
              label="Merchant Name*"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginTop: "5px" }}
            />
            <Grid container item xs={12} style={{ marginTop: "20px" }}>
              <EmailInput email={email} setEmail={setEmail} />
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Merchant City"
              variant="outlined"
              size="small"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code*"
              variant="outlined"
              size="small"
              inputProps={{
                type: "number",
                min: "1",
                max: "999999",
                step: "1",
              }}
              value={postalCode}
              onChange={(e) => {
                const input = e.target.value;
                // Check if input is a number and within the specified range
                if (
                  // !isNaN(input) &&
                  parseInt(input) >= 1 &&
                  parseInt(input) <= 999999
                ) {
                  setPostalCode(input);
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Select Business Type</InputLabel>
              <Select
                label="Select Business Type"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <MenuItem value="groceries">Groceries</MenuItem>
                <MenuItem value="resturant">Resturant</MenuItem>
                <MenuItem value="general">General</MenuItem>
                <MenuItem value="stationary">Stationary</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Delivery By</InputLabel>
              <Select
                label="Delivery By"
                value={deliveryBy}
                onChange={(e) => setDeliveryBy(e.target.value)}
              >
                <MenuItem value="merchant">Merchant</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MerchantCategory
              merchantCategory={merchantCategory}
              setMerchantCategory={setMerchantCategory}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderType orderType={orderType} setOrderType={setOrderType} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default MerchantDetails;
