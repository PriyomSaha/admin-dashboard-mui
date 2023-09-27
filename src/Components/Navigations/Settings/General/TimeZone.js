import { Box, Grid, Paper, Typography } from "@mui/material";
import TimeZoneSelect from "Components/Assets/ReusableComp/TimeZoneSelect";
import React, { forwardRef } from "react";

function TimeZone({}, ref) {
  // This component doesn't have any state or logic, it's purely presentational

  return (
    <>
      {/* Grid for TimeZone Section */}
      <Grid ref={ref} item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          {/* Section Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Timezone
          </Typography>
          {/* Section Description */}
          <Typography>Timezone your products are sold in.</Typography>
        </Box>
      </Grid>

      {/* Grid for the Timezone Selection */}
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          {/* Paper for the Selection */}
          <Paper elevation={3}>
            <Box px={4} py={3}>
              {/* TimeZoneSelect Component */}
              <TimeZoneSelect />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(TimeZone);
