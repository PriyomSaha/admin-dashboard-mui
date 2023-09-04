import { Grid } from "@mui/material";
import DeliveryFee from "./DeliveryFee";
import Orders from "./Orders";
import Sales from "./Sales";

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
        <Orders />
        <Sales />
        <DeliveryFee />
      </Grid>
    </>
  );
}

export default Analytics;
