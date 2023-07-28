import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { ComponentHeader, ComponentBody } from "Components/Assets/GlobalStyles";
import DateRangePicker from "Components/Assets/DateRangePicker";
import WelcomeRefreshInterval from "./WelcomeRefreshInterval";

function Dashboard() {
  return (
    <>
      <ComponentHeader>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap" }}
        >
          <Typography
            variant="h5"
            noWrap={true}
            sx={{
              fontWeight: "medium",
              letterSpacing: 1,
              fontSize: 25,
              textTransform: "capitalize",
            }}
          >
            Dashboard
          </Typography>

          <DateRangePicker />
        </Stack>
      </ComponentHeader>

      <ComponentBody>
        <WelcomeRefreshInterval />
      </ComponentBody>
    </>
  );
}

export default Dashboard;
