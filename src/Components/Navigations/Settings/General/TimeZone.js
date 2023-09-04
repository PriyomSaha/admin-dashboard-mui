import { Box, Grid, Paper, Typography } from "@mui/material";
import TimeZoneSelect from "Components/Assets/ReusableComp/TimeZoneSelect";
import React from "react";

function TimeZone() {
  return (
    <>
      <Grid item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Timezone
          </Typography>
          <Typography>Timezone your products are sold in.</Typography>
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
              <TimeZoneSelect />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default TimeZone;
