import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";
import NotificationTable from "./NotificationTable";

function Admin({}, ref) {
  return (
    <>
      <Grid ref={ref} item xs={12} sm={6}>
        <Box mt={2}>
          {/* Section Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Admin Notification
          </Typography>
          {/* Section Description */}
          <Typography>Set Custom Notifications for Admin</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <NotificationTable />
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(Admin);
