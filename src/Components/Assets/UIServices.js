import { orders } from "Components/Assets/DummyOrders";
let orderCount = {
  All: orders.length,
  Pending: 0,
  Accepted: 0,
  Ready: 0,
  Collected: 0,
  Completed: 0,
  Cancelled: 0,
};



export const getOrders = (orderType) => {
  if (orderType === "All") return orders;
  else return orders.filter((ord) => ord.status === orderType);
};

export const updateOrderCount = () => {
  for (const order of orders) {
    const key = order.status;
    orderCount[key]++;
  }
  return orderCount;
};
