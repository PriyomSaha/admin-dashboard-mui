import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getOrders } from "Components/Assets/UIServices";
import { useOrdersLoadingStore } from "Components/Assets/StateManagement";

export default function OrderStatusFilter({ counts, setOrders }) {
  const [value, setValue] = React.useState(0);

  const setIsOrderLoading = useOrdersLoadingStore(
    (state) => state.setIsOrderLoading
  );
  const isOrderLoading = useOrdersLoadingStore((state) => state.isOrderLoading);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /*To check if skeleton works */
  // const load = async () => {
  //   await setIsOrderLoading();
  //   console.log(isOrderLoading);
  //   await setTimeout(function () {
  //     setOrders(getOrders("All"));
  //     setIsOrderLoading();
  //   }, 6000);
  // };
  // load();

  React.useEffect(() => {
    setOrders(getOrders("All"));
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
        }}
      >
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Filter Order Status"
          sx={{ overflow: "auto" }}
        >
          <Tab
            label={`All  (${counts.All})`}
            onClick={() => setOrders(getOrders("All"))}
          />
          <Tab
            label={`Pending  (${counts.Pending})`}
            onClick={() => setOrders(getOrders("Pending"))}
          />
          <Tab
            label={`Accepted  (${counts.Accepted})`}
            onClick={() => setOrders(getOrders("Accepted"))}
          />
          <Tab
            label={`Ready  (${counts.Ready})`}
            onClick={() => setOrders(getOrders("Ready"))}
          />
          <Tab
            label={`Collected  (${counts.Collected})`}
            onClick={() => setOrders(getOrders("Collected"))}
          />
          <Tab
            label={`Completed  (${counts.Completed})`}
            onClick={() => setOrders(getOrders("Completed"))}
          />
          <Tab
            label={`Cancelled  (${counts.Cancelled})`}
            onClick={() => setOrders(getOrders("Cancelled"))}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
