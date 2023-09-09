import React, { forwardRef, useState } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";
import { MdAdd } from "react-icons/md";
import DynamicTextBox from "./DynamicTextBox";

function SocialMediaLink({}, ref) {
  // State to control modal open/close for adding a new text field when the "Add" button is clicked
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Grid item for displaying the title and description */}
      <Grid ref={ref} item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Social Media Links
          </Typography>
          {/* Description */}
          <Typography>Update Social Media pages links</Typography>
        </Box>
      </Grid>
      {/* Grid item for displaying the DynamicTextBox and "Add" button */}
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          {/* Paper component for containing the DynamicTextBox */}
          <Paper elevation={3}>
            <Box px={4} py={3}>
              {/* DynamicTextBox component */}
              <DynamicTextBox
                isModalOpen={isModalOpen} // Pass the modal state as a prop
                setIsModalOpen={setIsModalOpen} // Pass the modal state updater as a prop
              />
            </Box>
          </Paper>
          <Box mt={2}>
            {/* "Add New" button */}
            <Button
              onClick={() => setIsModalOpen(true)} // Open the modal on button click
              variant={"contained-dark"} // Use the dark variant
              sx={{
                ":hover": {
                  background: theme.palette.grey[800], // Darken the background on hover
                },
              }}
            >
              Add New &nbsp;
              <MdAdd /> {/* Add a '+' icon */}
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(SocialMediaLink);
