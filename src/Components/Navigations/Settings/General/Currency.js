import { Box, Grid, Paper, Typography } from "@mui/material";
import CurrencySelect from "Components/Assets/ReusableComp/Currencies/CurrencySelect";
import React, { forwardRef } from "react";

// This functional component represents a section for selecting the currency.
function Currency({}, ref) {
  return (
    <>
      {/* Section Header */}
      <Grid ref={ref} item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Currency
          </Typography>
          {/* Description about the currency selection */}
          <Typography>The Currency your products are sold in.</Typography>
        </Box>
      </Grid>
      {/* Currency Selection */}
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          {/* Paper component to create a visual container */}
          <Paper elevation={3}>
            <Box px={4} py={3}>
              {/* Component for selecting the currency */}
              <CurrencySelect />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

// Exporting the component with forwardRef to allow parent components to access its ref.
export default forwardRef(Currency);
