import { Box, Grid, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import TypesTable from "./TypesTable";

function OrderTypes({}, ref) {
  return (
    <>
      {/* Grid for Site Settings Section */}
      <Grid ref={ref} item xs={12} sm={6}>
        <Box mt={2}>
          {/* Section Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Order Types
          </Typography>
          {/* Section Description */}
          <Typography>List of available order types</Typography>
        </Box>
      </Grid>
      {/* Grid for the Site Settings Form */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TypesTable />
      </Grid>
    </>
  );
}

export default forwardRef(OrderTypes);
