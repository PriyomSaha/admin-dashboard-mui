import React from "react";
import { Box, Button } from "@mui/material";

function AddNewImportExportButton() {
  return (
    <Box alignSelf="center">
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
