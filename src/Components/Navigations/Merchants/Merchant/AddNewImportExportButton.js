import { Box, Button } from "@mui/material";
import { useMerchantStore } from "Components/Assets/StateManagement";
import React from "react";

function AddNewImportExportButton() {
  const setIsMerchantModalOpen = useMerchantStore(
    (state) => state.setIsMerchantModalOpen
  );
  const setMerchantType = useMerchantStore((state) => state.setMerchantType);

  return (
    <Box alignSelf="center">
      <Button
        variant="contained"
        sx={{
          mr: 1,
        }}
        onClick={() => {
          setMerchantType("Add");
          setIsMerchantModalOpen();
        }}
      >
        Add New
      </Button>
      <Button
        variant="contained"
        sx={{
          mr: 1,
        }}
      >
        Import
      </Button>
      <Button
        variant="contained"
        sx={{
          mr: 1,
        }}
      >
        Export
      </Button>
    </Box>
  );
}

export default AddNewImportExportButton;
