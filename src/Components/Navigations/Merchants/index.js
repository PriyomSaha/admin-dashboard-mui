import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { ComponentBody, ComponentHeader } from "Components/Assets/GlobalStyles";
import { Outlet, useLocation } from "react-router-dom";
import AddNewImportExportButton from "Components/Navigations/Merchants/Merchant/AddNewImportExportButton";
import MerchantsNavigation from "./MerchantsNavigation";

function Merchants() {
  const location = useLocation();
  let subPath = location.pathname.split("/").slice(-1);

  const subPathContainMerchant = subPath[0].includes("merchant");

  return (
    <>
      <ComponentHeader>
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
          ) : (
            <Button variant="contained">Add New</Button>
          )}
        </Stack>
      </ComponentHeader>
      <ComponentBody>
        <MerchantsNavigation />
        <Outlet />
      </ComponentBody>
    </>
  );
}

export default Merchants;
