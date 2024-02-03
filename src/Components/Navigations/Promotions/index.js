import { Button, Stack, Typography } from "@mui/material";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PromotionNavigation from "Components/Navigations/Promotions/PromotionNavigation";
import {
  useBannerStore,
  useCouponStore,
  useDrawerStore,
  usePopupStore,
} from "Components/Assets/StateManagement";

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

  // Access state and functions from the coupon store using custom hooks
  const setCouponType = useCouponStore((state) => state.setCouponType);
  const setIsCouponModalOpen = useCouponStore(
    (state) => state.setIsCouponModalOpen
  );

  // Access state and functions from the Popup store using custom hooks
  const setPopupType = usePopupStore((state) => state.setPopupType);
  const setIsPopupModalOpen = usePopupStore(
    (state) => state.setIsPopupModalOpen
  );
  // Handle the "Add New" button click based on the current subPath
  const addNewHandler = () => {
    if (subPath.includes("banners")) {
      // Open the banner modal and set the banner modal type to "Add"
      setIsBannerModalOpen();
      setBannerType("Add");
    }
    if (subPath.includes("coupons")) {
      // Open the Coupons modal and set the Coupon modal type to "Add"
      setIsCouponModalOpen();
      setCouponType("Add");
    }
    if (subPath.includes("popups")) {
      // Open the Popup modal and set the Popup modal type to "Add"
      setIsPopupModalOpen();
      setPopupType("Add");
    }
  };

  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);

  return (
    <>
      {/* Header section for the Promotions component */}
      <ComponentHeader isDrawerOpen={isDrawerOpen}>
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
      <ComponentBody isDrawerOpen={isDrawerOpen}>
        {/* Navigation component specific to promotions */}
        <PromotionNavigation />
        {/* Outlet component to render nested routes */}
        <Outlet />
      </ComponentBody>
    </>
  );
}

export default Promotions;
