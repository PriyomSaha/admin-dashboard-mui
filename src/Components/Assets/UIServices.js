import {
  orders,
  merchants,
  categories,
  products,
  users,
  topMerchants,
  topProducts,
  customers,
  customCharges,
  orderTypes,
} from "Components/Assets/DummyData";

// Function 'updateOrderCount' to update the counts of orders for each status in 'orderCount'
export const updateOrderCount = (orders) => {
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

export const getCustomers = (custType) => {
  if (custType === "All") return customers;
  else return customers.filter((cust) => cust.status === custType);
};

export const updateCustomersCount = () => {
  let customersCount = {
    All: customers.length,
    Active: 0,
    Block: 0,
  };

  for (const customer of customers) {
    const key = customer.status;
    customersCount[key]++;
  }
  return customersCount;
};

export const getMerchants = () => {
  return merchants;
};

export const getCategories = () => {
  return categories;
};

export const getProducts = () => {
  return products;
};
export const getUsers = () => {
  return users;
};
export const getTopMerchants = () => {
  return topMerchants;
};
export const getTopProducts = () => {
  return topProducts;
};
export const getCustomCharges = () => {
  return customCharges;
};

export const getOrderTypes = () => {
  return orderTypes;
};
