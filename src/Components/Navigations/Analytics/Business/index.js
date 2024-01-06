import { Grid, useMediaQuery } from "@mui/material";
import Customer from "Components/Assets/ReusableComp/GraphContainers/Customers";
import DeliveryFee from "Components/Assets/ReusableComp/GraphContainers/DeliveryFee";
import Orders from "Components/Assets/ReusableComp/GraphContainers/Orders";
import { PlatformOverview } from "Components/Assets/ReusableComp/GraphContainers/PlatformOverview";
import Sales from "Components/Assets/ReusableComp/GraphContainers/Sales";
import React from "react";

function Business() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent={"space-around"}
        mt={1}
        px={matches ? 3 : 0.5}
      >
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Orders />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Sales />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DeliveryFee />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent={"start"}
        mt={1}
        px={matches ? 3 : 0.5}
      >
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <PlatformOverview />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Customer />
        </Grid>
      </Grid>
    </>
  );
}

export default Business;
