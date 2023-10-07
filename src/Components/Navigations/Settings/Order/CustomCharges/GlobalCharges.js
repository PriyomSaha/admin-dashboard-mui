import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FaPercentage, FaRupeeSign } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";
import { theme } from "Components/UI/themes";
import CompactChipInputSelect from "Components/Assets/ReusableComp/CompactChipInputSelect";

function GlobalCharges() {
  // Define initial states for various settings

  // Types of orders (e.g., Delivery, Pickup, Custom)
  const types = ["Delivery", "Pickup", "Custom"];

  // State for selected order types (can be multiple)
  const [orderType, setOrderType] = useState([]);

  // State for charge type (percentage or fixed)
  const [chargeType, setChargeType] = useState("percentage");

  // State for the value of the charge (e.g., percentage value or fixed amount)
  const [chargeValue, setChargeValue] = useState(0);

  // State for how the charge is calculated (only for percentage type)
  const [calculatedOn, setCalculatedOn] = useState("subTotal");

  return (
    <>
      {/* Heading */}
      <Typography variant="h6" mt={2} fontWeight={500}>
        Set Rules
      </Typography>

      {/* Grid layout */}
      <Grid
        container
        spacing={useMediaQuery(theme.breakpoints.down("md")) ? 2 : 1}
      >
        {/* Charge Type Selection */}
        <Grid item xs={12} sm={4}>
          <Typography mt={1} mb={2}>
            Charge Type
          </Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Charge Type</InputLabel>
            <Select
              label="Charge Type"
              onChange={(e) => setChargeType(e.target.value)}
              value={chargeType}
              mt={2}
            >
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="fixed">Fixed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Charge Value Input */}
        <Grid item xs={12} sm={4}>
          <Typography mt={1} mb={2}>
            Enter value
          </Typography>
          <TextField
            value={chargeValue}
            onChange={(e) => setChargeValue(e.target.value)}
            fullWidth
            label="Enter value"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {chargeType === "percentage" ? (
                    <FaPercentage />
                  ) : (
                    <FaRupeeSign />
                  )}
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>

        {/* Calculated On Selection (Conditional based on Charge Type) */}
        <Grid item xs={12} sm={4}>
          {chargeType === "percentage" ? (
            <>
              <Typography mt={1} mb={2}>
                Calculated On
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Calculated On</InputLabel>
                <Select
                  label="Calculated On"
                  onChange={(e) => setCalculatedOn(e.target.value)}
                  value={calculatedOn}
                  mt={2}
                >
                  <MenuItem value="subTotal">Sub Total</MenuItem>
                </Select>
              </FormControl>
            </>
          ) : null}
        </Grid>

        {/* Order Type Selection */}
        <Grid item xs={12} mt={1}>
          <Typography mt={1} mb={2}>
            Select Order Type*
          </Typography>

          {/* A custom component for selecting order types */}
          <CompactChipInputSelect
            totalList={types}
            selectedItems={orderType}
            setSelectedItems={setOrderType}
            inputLabelText="Select Order Type*"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default GlobalCharges;
