import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import { Outlet, useLocation } from "react-router-dom";
import AddNewImportExportButton from "Components/Navigations/Merchants/Merchant/AddNewImportExportButton";
import MerchantsNavigation from "./MerchantsNavigation";
import { useDrawerStore } from "Components/Assets/StateManagement";

function Merchants() {
  const location = useLocation();
  let subPath = location.pathname.split("/").slice(-1);

  const subPathContainMerchant = subPath[0].includes("merchant");

  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);

  return (
    <>
      <ComponentHeader isDrawerOpen={isDrawerOpen}>
        <Stack
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
              alignSelf: "center",
            }}
          >
            {subPath}
          </Typography>
          {subPathContainMerchant ? (
            <AddNewImportExportButton />
          ) : subPath[0].includes("category") ? (
            <Button variant="contained">Add New</Button>
          ) : null}
        </Stack>
      </ComponentHeader>
      <ComponentBody isDrawerOpen={isDrawerOpen}>
        <MerchantsNavigation />
        <Outlet />
      </ComponentBody>
    </>
  );
}

export default Merchants;
