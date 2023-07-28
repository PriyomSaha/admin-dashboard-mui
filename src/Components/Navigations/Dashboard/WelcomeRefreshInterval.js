import {
  Box,
  Grid,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useAccountStore } from "Components/Assets/StateManagement";
import { useState } from "react";

function WelcomeRefreshInterval() {
  const userData = useAccountStore((state) => state.userData);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  let [refreshInterval, setRefreshInterval] = useState("off");

  return (
    <Stack
      spacing={2}
      direction={matches ? "row" : "column"}
      justifyContent="space-between"
      sx={{ flexWrap: "wrap" }}
      alignItems="center"
    >
      <Grid item sm={8}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, display: "inline-block" }}
        >
          Hello {userData.userName.split(" ")[0]}. &nbsp;
        </Typography>
        <Typography sx={{ fontWeight: 600, display: "inline-block" }}>
          Here's what happening with your store
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Typography mx={1} sx={{ display: "inline-block" }}>
          Refresh Every
        </Typography>
        <select
          defaultValue={refreshInterval}
          onChange={(e) => setRefreshInterval(e.target.value)}
        >
          <option value="off">Off</option>
          <option value="10">10 Seconds</option>
          <option value="30">30 Seconds</option>
          <option value="60">60 Seconds</option>
        </select>
      </Grid>
    </Stack>
  );
}

export default WelcomeRefreshInterval;
