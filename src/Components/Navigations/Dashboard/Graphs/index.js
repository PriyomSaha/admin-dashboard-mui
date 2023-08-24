import { Grid } from "@mui/material";
import DeliveryFee from "./DeliveryFee";
import Orders from "./Orders";
import Sales from "./Sales";

function Analytics() {
  return (
    <>
      <Grid container spacing={3} justifyContent={"space-around"} mt={1} px={3}>
        <Orders />
        <Sales />
        <DeliveryFee />
      </Grid>
      <Grid container spacing={3} justifyContent={"space-around"} mt={1} px={3}>
        {/* Add the tables */}
      </Grid>
    </>
  );
}

export default Analytics;
