import { Box, useMediaQuery } from "@mui/material";
import SideNav from "Components/Navigations/Header/SideNav";
import TopNav from "Components/Navigations/Header/TopNav";
import { theme } from "Components/UI/themes";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <TopNav />
      <Box>
        <SideNav />
        <Box sx={{ flexGrow: 1, ml: isSmall ? 0 : 8 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
