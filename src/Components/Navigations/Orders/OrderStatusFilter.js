import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useOrdersStore } from "Components/Assets/StateManagement";
import axios from "axios";

// API endpoints
const allOrdersUrl = process.env.REACT_APP_GET_ORDERS_LIST_URL_SUPERADMIN;

// Functional component 'OrderStatusFilter' to filter orders by their status
export default function OrderStatusFilter({ counts, setOrders }) {
  // State variable 'value' to keep track of the currently selected tab index
  const [value, setValue] = React.useState(0);

  // Custom hook 'useOrdersLoadingStore' to access and update 'isOrderLoading' state
  const setIsOrderLoading = useOrdersStore((state) => state.setIsOrderLoading);

  const setInitialOrdersList = useOrdersStore(
    (state) => state.setInitialOrdersList
  );
  const setFilteredOrdersList = useOrdersStore(
    (state) => state.setFilteredOrdersList
  );

  // Function to handle tab change event and update the 'value' state
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllOrders = async () => {
    await setIsOrderLoading();
    console.log(allOrdersUrl);
    const response = await axios.get(allOrdersUrl);
    setInitialOrdersList(response.data);
    await setIsOrderLoading();
  };

  // useEffect hook to set initial orders when the component is mounted
  React.useEffect(() => {
    //To retrieve data through API
    getAllOrders();
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
        }}
      >
        {/* Tabs component to display the filter options for order status */}
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Filter Order Status"
          sx={{ overflow: "auto" }}
        >
          {/* Each Tab represents a different order status and displays its count */}
          {/* onClick event for each Tab calls the 'setOrders' function with the corresponding status */}
          <Tab
            label={`All  (${counts.All})`}
            onClick={() => setFilteredOrdersList("All")}
          />
          <Tab
            label={`Pending  (${counts.Pending})`}
            onClick={() => setFilteredOrdersList("Pending")}
          />
          <Tab
            label={`Accepted  (${counts.Accepted})`}
            onClick={() => setFilteredOrdersList("Accepted")}
          />
          <Tab
            label={`Ready  (${counts.Ready})`}
            onClick={() => setFilteredOrdersList("Ready")}
          />
          <Tab
            label={`Collected  (${counts.Collected})`}
            onClick={() => setFilteredOrdersList("Collected")}
          />
          <Tab
            label={`Completed  (${counts.Completed})`}
            onClick={() => setFilteredOrdersList("Completed")}
          />
          <Tab
            label={`Cancelled  (${counts.Cancelled})`}
            onClick={() => setFilteredOrdersList("Cancelled")}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
