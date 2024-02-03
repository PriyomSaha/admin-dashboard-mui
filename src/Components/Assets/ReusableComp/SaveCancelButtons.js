import React from "react";
import { Box, Button } from "@mui/material";
import { theme } from "Components/UI/themes";

function SaveCancelButtons({ isModalOpen, setIsModalOpen, runOnSave }) {
  return (
    <>
      {/* Horizontal line for visual separation */}
      <hr />

      {/* Container for the Save and Close buttons */}
      <Box pb={4}>
        {/* Save button */}
        <Button
          variant="contained"
          sx={{
            float: "right",
            position: "relative",
          }}
          // Click event handler to handle the "Save" action
          onClick={() => {
            // Perform the action to save the changes here...
            runOnSave();
            // setIsModalOpen(!isModalOpen);
          }}
        >
          Save
        </Button>

        {/* Close button */}
        <Button
          variant="contained"
          sx={{
            float: "left",
            position: "relative",
            background: `${theme.palette.grey[600]}`,
            "&:hover": {
              background: `${theme.palette.grey[700]}`,
            },
          }}
          // Click event handler to close the modal without saving
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Close
        </Button>
      </Box>
    </>
  );
}

export default SaveCancelButtons;
