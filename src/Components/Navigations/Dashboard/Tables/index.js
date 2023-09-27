import { Grid } from "@mui/material";
import React from "react";
import TopPerformingProducts from "./TopPerformingProducts";
import TopPermormingMerchants from "./TopPermormingMerchants";

function TopPerformers({ matches }) {
  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent={"space-around"}
        mt={1}
        px={matches ? 3 : 0.5}
      >
        <TopPerformingProducts />
        <TopPermormingMerchants />
      </Grid>
    </>
  );
}

export default TopPerformers;
