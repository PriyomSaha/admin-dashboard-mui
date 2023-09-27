import { React, useEffect, useState } from "react";
import { orderStatus } from "Components/Assets/NavigationsProvider";
import { Box } from "@mui/material";

// Functional component 'OrderStatus' to display and manage the status of an order
export default function OrderStatus(props) {
  // Set Order Status and its Background
  let [prevClass, setPrevClass] = useState(); // State variable to store the previous status class

  // State variable 'status' to hold the current status of the order
  let [status, setStatus] = useState(props.status);

  // Function to update the order status and apply corresponding CSS class
  let setOrderStatus = (e) => {
    let value = e.target.value;
    setStatus(value);
    document
      .getElementById(`order-status-${props.id}`)
      .classList.remove(prevClass);
    document
      .getElementById(`order-status-${props.id}`)
      .classList.add(`order-status-${value}`);

    setPrevClass(`order-status-${value}`);
  };

  // useEffect hook to apply the initial status CSS class
  useEffect(() => {
    document
      .getElementById(`order-status-${props.id}`)
      .classList.add(`order-status-${status}`);
  });

  return (
    <Box className="select-container">
      {/* Select element to display the order status dropdown */}
      <select
        id={`order-status-${props.id}`}
        value={status}
        onChange={(e) => setOrderStatus(e)}
      >
        {orderStatus.map((value, index) => (
          // Display each order status as an option in the dropdown
          <option
            value={value}
            key={value}
            style={{ backgroundColor: "white", color: "black" }}
            select={(index === 0).toString()}
          >
            {value}
          </option>
        ))}
      </select>
    </Box>
  );
}
/*
Comments Explanation:

The code imports required modules and components from React and MUI (Material-UI) libraries.

The OrderStatus functional component represents the status of an order and provides functionality to change it.

The component uses the useState hook to manage the prevClass state variable, which stores the previous status class, and the status state variable, which holds the current status of the order.

The setOrderStatus function is responsible for updating the order status when the user selects a new status from the dropdown. It also applies the corresponding CSS class to change the background color based on the selected status.

The useEffect hook is used to apply the initial status CSS class when the component is mounted.

The component returns a Box container with the className "select-container" to provide some styling for the select element.

Inside the Box, there's a select element to display the order status dropdown.

The select element uses the status state variable to set the currently selected status and calls the setOrderStatus function when the user selects a new option.

The dropdown options are generated using the orderStatus array, displaying each order status as an option.

The select element also includes inline styles to set the background color to white and text color to black for each option.

The component allows users to change the status of an order by selecting a new status from the dropdown. The CSS class applied to the order status element is updated accordingly.

The component is exported as the default export to be used in other parts of the application as needed.
*/
