import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import currencies from "./CurrenciesList"; // Import the currency data

export default function CurrencySelect() {
  const [selectedCurrency, setSelectedCurrency] = useState(""); // State to store selected currency

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value); // Update the selected currency when the dropdown changes
  };

  // Find the currency object that matches the selected currency code
  const selectedCurrencyData = currencies.find(
    (currency) => currency.code === selectedCurrency
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Select Currency</InputLabel>
          <Select
            native
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            label="Select Currency"
          >
            <option aria-label="None" value="" />
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} - {currency.code}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        {/* Disabled textbox to display the currency symbol */}
        <TextField
          label="Symbol"
          value={selectedCurrencyData ? selectedCurrencyData.symbol : ""}
          disabled
          variant="outlined"
          size="small"
          sx={{
            "& .MuiInputBase-input": {
              textAlign: "center", // Center align the text
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
