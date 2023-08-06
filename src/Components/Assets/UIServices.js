import { orders, merchants, categories } from "Components/Assets/DummyData";

// Object 'orderCount' to store the counts of orders for different statuses
let orderCount = {
  All: orders.length, // Initial count of orders is set to the total number of orders
  Pending: 0, // Initial count of pending orders is set to 0
  Accepted: 0, // Initial count of accepted orders is set to 0
  Ready: 0, // Initial count of ready orders is set to 0
  Collected: 0, // Initial count of collected orders is set to 0
  Completed: 0, // Initial count of completed orders is set to 0
  Cancelled: 0, // Initial count of cancelled orders is set to 0
};

// Function 'getOrders' to filter and retrieve orders based on the specified orderType
export const getOrders = (orderType) => {
  // If 'orderType' is "All", return all orders
  if (orderType === "All") return orders;
  // Otherwise, return orders that match the given status 'orderType'
  else return orders.filter((ord) => ord.status === orderType);
};

// Function 'updateOrderCount' to update the counts of orders for each status in 'orderCount'
export const updateOrderCount = () => {
  // Loop through each order in 'orders' array
  for (const order of orders) {
    // Get the status of the current order
    const key = order.status;
    // Increment the corresponding order count in 'orderCount'
    orderCount[key]++;
  }
  // Return the updated 'orderCount' object
  return orderCount;
};
export const getMerchants = () => {
  return merchants;
};

export const getCategories = () => {
  return categories;
};
