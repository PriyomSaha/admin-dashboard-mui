import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import { Outlet, useLocation } from "react-router-dom";
import AddNewImportExportButton from "Components/Navigations/Merchants/Merchant/AddNewImportExportButton";
import MerchantsNavigation from "./MerchantsNavigation";
import {
  useAccountStore,
  useCategoryStore,
  useDrawerStore,
  useProductStore,
} from "Components/Assets/StateManagement";

function Merchants() {
  const location = useLocation();
  let subPath = location.pathname.split("/").slice(-1);

  const subPathContainMerchant = subPath[0].includes("merchant");

  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);

  const setCategoryType = useCategoryStore((state) => state.setCategoryType);
  const setIsCategoryModalOpen = useCategoryStore(
    (state) => state.setIsCategoryModalOpen
  );

  const setIsProductModalOpen = useProductStore(
    (state) => state.setIsProductModalOpen
  );
  const setProductType = useProductStore((state) => state.setProductType);
  const userRole = useAccountStore((state) => state.userData.role);

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
            <Button
              variant="contained"
              onClick={() => {
                setCategoryType("Add");
                setIsCategoryModalOpen();
              }}
            >
              Add New
            </Button>
          ) : userRole.toUpperCase() === "MANAGER" ? (
            <Button
              variant="contained"
              onClick={() => {
                setProductType("Add");
                setIsProductModalOpen();
              }}
            >
              Add New
            </Button>
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
