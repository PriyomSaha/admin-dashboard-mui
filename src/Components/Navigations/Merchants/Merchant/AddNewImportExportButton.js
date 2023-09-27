import { Box, Button } from "@mui/material";
import React from "react";

function AddNewImportExportButton() {
  return (
    <Box alignSelf="center">
      <Button
        variant="contained"
        sx={{
          mr: 1,
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
