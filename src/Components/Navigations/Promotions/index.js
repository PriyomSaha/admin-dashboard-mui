import { Button, Stack, Typography } from "@mui/material";
import DateRangePicker from "Components/Assets/ReusableComp/DateRangePicker";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PromotionNavigation from "Components/Navigations/Promotions/PromotionNavigation";

function Promotions() {
  const location = useLocation();
  let subPath = location.pathname.split("/").slice(-1);

  const navigate = useNavigate();
  console.log(subPath);

  useEffect(() => {
    if (subPath[0] === "promotions") {
      navigate("/promotions/banners");
    }
  }, [navigate, subPath]);
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
          <Button variant="contained">Add New</Button>
        </Stack>
      </ComponentHeader>
      <ComponentBody>
        <PromotionNavigation />
        <Outlet />
      </ComponentBody>
    </>
  );
}

export default Promotions;
