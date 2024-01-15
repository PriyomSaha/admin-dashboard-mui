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
        justifyContent={"flex-start"}
        mt={1}
        px={matches ? 3 : 0}
      >
        <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
          <Orders />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
          <Sales />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
          <DeliveryFee />
        </Grid>
      </Grid>
    </>
  );
}

export default Analytics;
