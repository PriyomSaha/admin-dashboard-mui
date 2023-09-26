import React from "react";
import { Box, Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { theme } from "Components/UI/themes";

function AddCustomerButton() {
  return (
    <Box alignSelf="end">
      <Button
        variant="contained-dark"
        sx={{
          ":hover": {
            background: theme.palette.grey[800],
          },
        }}
      >
        <AiOutlinePlus />
        AddCustomer
      </Button>
    </Box>
  );
}

export default AddCustomerButton;
