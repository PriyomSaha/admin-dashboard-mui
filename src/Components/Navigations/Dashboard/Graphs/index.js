import { Grid } from "@mui/material";
import DeliveryFee from "Components/Assets/ReusableComp/GraphContainers/DeliveryFee";
import Orders from "Components/Assets/ReusableComp/GraphContainers/Orders";
import Sales from "Components/Assets/ReusableComp/GraphContainers/Sales";

function Analytics({ matches }) {
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
    </>
  );
}

export default Analytics;
