import React, { useRef } from "react";
import { Box, Grid } from "@mui/material";
import SideNav from "Components/Assets/ReusableComp/SettingsSideNavWithRef";
import Scheduling from "./Scheduling";
import OrderTip from "./OrderTip";
import OrderAccept from "./OrderAccept";
import CustomCharges from "./CustomCharges/index";
import ChargesTable from "./CustomCharges/ChargesTable";
import OrderTypes from "./OrderTypes/OrderTypes";

function Order() {
  // Create a ref to store references to child components
  const refs = useRef([]);

  // Function to scroll to a specific section when a navigation link is clicked
  const handleClick = (index) => {
    window.scrollTo({
      top: refs.current[index].offsetTop - 100,
      behavior: "smooth",
    });
  };

  // List of items for the side navigation
  const sideNavList = [
    "Order Scheduling",
    "Order Tip",
    "Accept Orders",
    "Custom Charges",
    "Order Types",
  ];

  return (
    <Box width={"100%"}>
      {/* Main Grid container */}
      <Grid container spacing={3}>
        {/* Left side of the page with settings */}
        <Grid container item spacing={4} md={10}>
          {/* Each setting section is a separate component */}
          {/* Attach a ref to each component to allow scrolling to them */}
          <Scheduling
            ref={(element) => {
              refs.current[0] = element; // Store a reference to this component
            }}
          />
          <OrderTip
            ref={(element) => {
              refs.current[1] = element; // Store a reference to this component
            }}
          />
          <OrderAccept
            ref={(element) => {
              refs.current[2] = element; // Store a reference to this component
            }}
          />
          <CustomCharges
            ref={(element) => {
              refs.current[3] = element; // Store a reference to this component
            }}
          />
          <OrderTypes
            ref={(element) => {
              refs.current[4] = element; // Store a reference to this component
            }}
          />
        </Grid>

        {/* Right side of the page with navigation */}
        <Grid item md={2}>
          {/* SideNav component with navigation links */}
          {/* When a link is clicked, the handleClick function is called to scroll to the corresponding section */}
          <SideNav sideNavList={sideNavList} handleClick={handleClick} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Order;
