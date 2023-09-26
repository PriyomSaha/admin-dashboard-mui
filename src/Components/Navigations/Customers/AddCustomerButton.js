import React from "react";
import {Box, Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";

function AddCustomerButton() {
  return (
    <Box alignSelf="end" >
      <Button
        variant="contained-dark"
        >
        <AiOutlinePlus/>
        AddCustomer
      </Button>
      </Box>
  );
}

export default AddCustomerButton;
