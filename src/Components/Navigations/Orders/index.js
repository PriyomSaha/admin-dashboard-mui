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
