import { Box, Button } from "@mui/material";
import React from "react";
import { useEditProfileStore } from "Components/Assets/StateManagement";

function Update() {
  const setIsEditProfile = useEditProfileStore(
    (state) => state.setIsEditProfile
  );
  return (
    <>
      {/* Horizontal line for visual separation */}
      <hr />

      {/* Container for the Update buttons */}
      <Box>
        {/* Save button */}
        <Button
          variant="contained"
          sx={{
            float: "right",
            position: "relative",
          }}
          // Click event handler to handle the "Update" action
          onClick={() => setIsEditProfile()}
        >
          Update
        </Button>
      </Box>
    </>
  );
}

export default Update;
