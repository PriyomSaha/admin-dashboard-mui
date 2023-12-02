import { Button, Stack, Typography } from "@mui/material";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PromotionNavigation from "Components/Navigations/Promotions/PromotionNavigation";
import { useBannerStore } from "Components/Assets/StateManagement";

function Promotions() {
  // Get the current location object from the React Router
  const location = useLocation();

  // Extract the last part of the pathname as subPath
  let subPath = location.pathname.split("/").slice(-1);

  // Get the navigate function from the React Router
  const navigate = useNavigate();

  // Redirect to "/promotions/banners" if the last part of the path is "promotions"
  useEffect(() => {
    if (subPath[0] === "promotions") {
      navigate("/promotions/banners");
    }
  }, [navigate, subPath]);

  // Access state and functions from the banner store using custom hooks
  const setBannerType = useBannerStore((state) => state.setBannerType);
  const setIsBannerModalOpen = useBannerStore(
    (state) => state.setIsBannerModalOpen
  );

  // Handle the "Add New" button click based on the current subPath
  const addNewHandler = () => {
    if (subPath.includes("banners")) {
      // Open the banner modal and set the banner modal type to "Add"
      setIsBannerModalOpen();
      setBannerType("Add");
    }
    if (subPath.includes("Coupons")) {
      // Open the Coupons modal and set the Coupon modal type to "Add"
    }
  };

  return (
    <>
      {/* Header section for the Promotions component */}
      <ComponentHeader>
        {/* Stack component for layout */}
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap" }}
        >
          {/* Title Typography component */}
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
            {/* Display the current subPath as the title */}
            {subPath}
          </Typography>
          {/* Button component for "Add New" functionality */}
          <Button variant="contained" onClick={() => addNewHandler()}>
            Add New
          </Button>
        </Stack>
      </ComponentHeader>
      {/* Body section for the Promotions component */}
      <ComponentBody>
        {/* Navigation component specific to promotions */}
        <PromotionNavigation />
        {/* Outlet component to render nested routes */}
        <Outlet />
      </ComponentBody>
    </>
  );
}

export default Promotions;
