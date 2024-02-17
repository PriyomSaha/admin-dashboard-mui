import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { theme } from "Components/UI/themes";

function SaveCancelButtons({ isModalOpen, setIsModalOpen, runOnSave }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      {/* Horizontal line for visual separation */}
      <hr />

      {/* Container for the Save and Close buttons */}
      <Box pb={4}>
        {/* Save button */}
        {isSubmitting ? (
          <Button
            disabled={true}
            variant="contained"
            sx={{
              float: "right",
              position: "relative",
            }}
          >
            Saving...
            <CircularProgress
              size={20}
              sx={{
                color: "var(--header-nav-text)",
                ml: 2,
              }}
            />
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              float: "right",
              position: "relative",
            }}
            // Click event handler to handle the "Save" action
            onClick={async () => {
              await setIsSubmitting(true);
              // Perform the action to save the changes here...
              await runOnSave();
              // setIsModalOpen(!isModalOpen);
              await setIsSubmitting(false);
            }}
          >
            Save
          </Button>
        )}

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
