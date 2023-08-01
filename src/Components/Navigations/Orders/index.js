// Importing required modules and components from React and MUI library
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { ComponentHeader, ComponentBody } from "Components/Assets/GlobalStyles";
import DateRangePicker from "Components/Assets/DateRangePicker";
import OrderFilterSearchBar from "Components/Navigations/Orders/OrderFilterSearchBar";
import OrderTable from "Components/Navigations/Orders/OrderTable";
import OrderStatusFilter from "Components/Navigations/Orders/OrderStatusFilter";
import { updateOrderCount } from "Components/Assets/UIServices";

// Functional component 'Orders' to manage the Orders page
function Orders() {
  // State variables to hold orders data and counts
  const [orders, setOrders] = React.useState([]); // Represents the list of orders to be displayed
  const [counts, setCounts] = React.useState({}); // Represents the counts of orders based on their status

  // useEffect hook to update 'counts' state with order counts on component mount
  React.useEffect(() => {
    // Fetch and update the counts of orders for each status
    setCounts(updateOrderCount());
  }, []);

  return (
    <>
      {/* ComponentHeader containing the title and date range picker */}
      <ComponentHeader>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap" }}
        >
          {/* Title for the page */}
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
            Orders
          </Typography>

          {/* DateRangePicker component to allow users to select a date range */}
          <DateRangePicker />
        </Stack>
      </ComponentHeader>

      {/* ComponentBody containing filter search bar, order status filter, and order table */}
      <ComponentBody>
        {/* OrderFilterSearchBar component for filtering orders based on user input */}
        <OrderFilterSearchBar />

        {/* OrderStatusFilter component to allow users to filter orders by status */}
        {/* The 'counts' prop provides the order counts for each status */}
        {/* The 'setOrders' prop allows the OrderStatusFilter component to update the displayed orders */}
        <OrderStatusFilter counts={counts} setOrders={setOrders} />

        {/* OrderTable component to display the list of orders in a tabular format */}
        {/* The 'orders' prop provides the list of orders to be displayed */}
        <OrderTable orders={orders} />
      </ComponentBody>
    </>
  );
}

// Exporting the 'Orders' component as the default export
export default Orders;

/**
 * Comments Explanation:

The code imports required modules and components from the React and MUI (Material-UI) libraries.

The Orders functional component represents the Orders page, responsible for managing and displaying order-related information.

The component uses two state variables: orders to store the list of orders to be displayed and counts to hold the counts of orders based on their status.

The useEffect hook is used to fetch and update the order counts for each status when the component mounts.

The ComponentHeader component displays the header section of the Orders page, which includes the title and the DateRangePicker component.

The Typography component displays the title "Orders" with specified styles such as font size, weight, and letter spacing.

The DateRangePicker component allows users to select a date range, possibly for filtering orders within a specific period.

The ComponentBody component wraps the main content of the Orders page, including the filter search bar, order status filter, and order table.

The OrderFilterSearchBar component is responsible for enabling users to filter orders based on their input, possibly using search criteria.

The OrderStatusFilter component provides options to filter orders by status and receives the counts prop, which contains the counts of orders for each status. The setOrders prop is used to update the displayed orders based on the selected status.

The OrderTable component displays the list of orders in a tabular format and receives the orders prop, which holds the list of orders to be displayed.

Overall, the Orders component orchestrates different components to create the complete Orders page, providing order filtering and displaying functionalities.

The component is exported as the default export to be used in other parts of the application as needed.
 */
