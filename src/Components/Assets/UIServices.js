import {
  merchants,
  categories,
  products,
  users,
  topMerchants,
  topProducts,
  customers,
  customCharges,
  orderTypes,
  notificationEvents,
  banners,
  coupons,
  popups,
  reviews,
  commissionReport,
} from "Components/Assets/DummyData";
import dayjs from "dayjs";

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

export const updateCustomersCount = (customers) => {
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

export const getNotificationEvents = () => {
  return notificationEvents;
};

export const getBanners = () => {
  return banners;
};

export const getCoupons = () => {
  return coupons;
};
export const getPopups = () => {
  return popups;
};
export const getReviews = () => {
  return reviews;
};
export const getCommissionReport = () => {
  return commissionReport;
};

//global set cookies
//@param {cookieName , cookieValue , expairydays}
export const setCookie = async (name, value, days) => {
  const expires = new Date();
  //expire after number of days--prod
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  //expire after number of min--test
  // expires.setTime(expires.getTime() + 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};
//global get cookies
export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      // console.log(value);
      return value;
    }
  }
  // console.log(null);
  return null;
};
//delete cookies
export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

//check for permissions of the user
export const hasPermissions = (encodedPermissions, category, action) => {
  // Decode and split the stored data
  const decodedPermissions = decodeURIComponent(encodedPermissions);
  const permissionStrings = decodedPermissions.split(";");

  // Parse each string back into an object
  const permissions = permissionStrings.map((permissionString) =>
    JSON.parse(permissionString)
  );
  return permissions.some(
    (permission) =>
      permission.category.toLowerCase() === category.toLowerCase() &&
      (action
        ? permission.actions.some(
            (pAction) => pAction.toLowerCase() === action.toLowerCase()
          )
        : true)
  );
};

//Table Component update value
export const updateDataInTable = async (dataList, updates, id) => {
  // Find the index of the array list with the given ID
  const index = dataList.findIndex((data) => data.id === id);

  // If data with the given ID is found
  if (index !== -1) {
    // Update the data with the new key-value pairs
    dataList[index] = {
      ...dataList[index],
      ...updates,
    };
  } else {
    console.log("Mentioned ID not found.");
  }
};

//Table Component Delete data
export const deleteDataFromTable = async (dataList, id) => {
  const updated = dataList.filter((obj) => obj.id !== id);
  return updated;
};

//Day JS date formatter

export const getFormattedDate = (dateString) => {
  return dayjs(dateString).format("ddd DD MMM, hh:mm A");
};
