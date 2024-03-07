import { Alert, Slide, Snackbar, Stack } from "@mui/material";
import React from "react";
import { useSnackbarStore } from "../StateManagement";

function ToastAlert() {
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const snackbarType = useSnackbarStore((state) => state.snackbarType);
  const snackbarMessage = useSnackbarStore((state) => state.snackbarMessage);
  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={2000} // Adjust the duration as needed
      onClose={() => setShowSnackbar(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={Slide}
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
