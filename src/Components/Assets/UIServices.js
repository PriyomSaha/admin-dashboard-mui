import {
  orders,
  customers,
  merchants,
  categories,
  products,
  users,
  topMerchants,
  topProducts,
} from "Components/Assets/DummyData";

// Function 'getOrders' to filter and retrieve orders based on the specified orderType
export const getOrders = (orderType) => {
  // If 'orderType' is "All", return all orders
  if (orderType === "All") return orders;
  // Otherwise, return orders that match the given status 'orderType'
  else return orders.filter((ord) => ord.status === orderType);
};

// Function 'updateOrderCount' to update the counts of orders for each status in 'orderCount'
export const updateOrderCount = () => {
  for (const order of orders) {
    // Get the status of the current order
    const key = order.status;
    // Increment the corresponding order count in 'orderCount'
    orderCount[key]++;
  }
  // Return the updated 'orderCount' object
  return orderCount;
};
