import React, { useEffect, forwardRef, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { CustomSwitch } from "Components/UI/GlobalStyles";

function Scheduling({}, ref) {
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      {/* Grid for Site Settings Section */}
      <Grid ref={ref} item xs={12} sm={6}>
        <Box mt={2}>
          {/* Section Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Order Scheduling
          </Typography>
          {/* Section Description */}
          <Typography>Do you want scheduled orders?</Typography>
        </Box>
      </Grid>

      {/* Grid for the Site Settings Form */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box width={"100%"}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" onClick={() => setEnabled(false)}>
              DISABLE
            </Typography>
            <CustomSwitch
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography variant="h6" onClick={() => setEnabled(true)}>
              <b>ENABLE</b>
            </Typography>
          </Stack>
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(Scheduling);
