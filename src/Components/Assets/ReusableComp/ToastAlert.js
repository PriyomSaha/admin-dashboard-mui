import { Alert, Snackbar, Stack } from "@mui/material";
import React from "react";

function ToastAlert({showSnackbar,setShowSnackbar,snackbarType,snackbarMessage}) {
  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={8000} // Adjust the duration as needed
      onClose={() => setShowSnackbar(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Alert severity={snackbarType} variant="filled">
          {snackbarMessage}
        </Alert>
      </Stack>
    </Snackbar>
  );
}

export default ToastAlert;
