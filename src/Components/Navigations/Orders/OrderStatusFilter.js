import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getOrders } from "Components/Assets/UIServices";
import { useOrdersLoadingStore } from "Components/Assets/StateManagement";

// Functional component 'OrderStatusFilter' to filter orders by their status
export default function OrderStatusFilter({ counts, setOrders }) {
  // State variable 'value' to keep track of the currently selected tab index
  const [value, setValue] = React.useState(0);

  // Custom hook 'useOrdersLoadingStore' to access and update 'isOrderLoading' state
  const setIsOrderLoading = useOrdersLoadingStore(
    (state) => state.setIsOrderLoading
  );
  const isOrderLoading = useOrdersLoadingStore((state) => state.isOrderLoading);

  // Function to handle tab change event and update the 'value' state
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* To check if skeleton works (Commented out for production) */
  const load = async () => {
    await setIsOrderLoading();
    await setTimeout(function () {
      setOrders(getOrders("All"));
      setIsOrderLoading();
    }, 6000);
  };

  // useEffect hook to set initial orders when the component is mounted
  React.useEffect(() => {
    //Coment setOrders() if load() uncommented and viceversa
    // setOrders(getOrders("All"));
    load();
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

/**Comments Explanation:

The code imports required modules and components from React and MUI (Material-UI) libraries.

The OrderStatusFilter functional component is responsible for filtering orders based on their status.

The component uses the useState hook to manage the value state variable, which keeps track of the currently selected tab index.

The component uses the custom hook useOrdersLoadingStore to access and update the isOrderLoading state, which is used for skeleton loading (commented out in production).

The handleChange function is used to handle the tab change event and update the value state when a different tab is selected.

The useEffect hook is used to set the initial orders when the component is mounted by calling setOrders with the status "All".

The component returns a Box container with the className "select-container" to provide some styling for the Tabs component.

Inside the Box, there's a Tabs component to display the filter options for order status.

Each Tab represents a different order status and displays its count in parentheses.

When a tab is clicked, the corresponding setOrders function is called with the corresponding status to filter the orders accordingly.

The component allows users to filter orders by their status using the Tabs component and selecting the desired status.
 */
