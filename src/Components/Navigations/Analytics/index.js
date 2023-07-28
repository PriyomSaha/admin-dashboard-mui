import { Stack, Typography } from "@mui/material";
import DateRangePicker from "Components/Assets/DateRangePicker";
import { ComponentHeader } from "Components/Assets/GlobalStyles";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function Analytics() {
  const location = useLocation();
  let subPath = location.pathname.split("/").slice(-1);
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
            {subPath}
          </Typography>

          <DateRangePicker />
        </Stack>
      </ComponentHeader>
      <Typography></Typography>
      <Outlet />
    </>
  );
}

export default Analytics;
