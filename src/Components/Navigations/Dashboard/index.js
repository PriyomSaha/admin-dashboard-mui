import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Stack, useMediaQuery } from "@mui/material";
import { ComponentHeader, ComponentBody } from "Components/UI/GlobalStyles";
import DateRangePicker from "Components/Assets/ReusableComp/DateRangePicker";
import WelcomeRefreshInterval from "./WelcomeRefreshInterval";
import Analytics from "Components/Navigations/Dashboard/Graphs/index";
import TopPerformers from "./Tables";

function Dashboard() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

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
        <Analytics matches={matches} />
        <TopPerformers matches={matches} />
      </ComponentBody>
    </>
  );
}

export default Dashboard;
