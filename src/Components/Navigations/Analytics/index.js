import { Stack, Typography } from "@mui/material";
import DateRangePicker from "Components/Assets/ReusableComp/DateRangePicker";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDrawerStore } from "Components/Assets/StateManagement";

function Analytics() {
  const location = useLocation();
  let subPath = location.pathname.split("/").slice(-1);
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);

  return (
    <>
      <ComponentHeader isDrawerOpen={isDrawerOpen}>
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
      <ComponentBody isDrawerOpen={isDrawerOpen}>
        <Outlet />
      </ComponentBody>
    </>
  );
}

export default Analytics;
