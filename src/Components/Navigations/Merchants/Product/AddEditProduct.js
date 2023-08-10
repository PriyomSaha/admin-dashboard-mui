import {
    Box,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import {
    FullScreenModalContainer,
    FullScreenModalContent,
  } from "Components/Assets/GlobalStyles";
  import { theme } from "Components/UI/themes";
  import React, { useState } from "react";
  import { FaRegEdit } from "react-icons/fa";
  import { MdClose } from "react-icons/md";
  import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
  import ImageUpload from "Components/Assets/ReusableComp/ImageUpload";
  
  function AddEditCategory() {
    // State to control the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <>
        {/* Icon button to open the modal */}
        <FaRegEdit
          onClick={() => setIsModalOpen(true)}
          style={{ fontSize: "25px", cursor: "pointer" }}
        />
  
        {/* The modal dialog */}
        <Modal open={isModalOpen} sx={FullScreenModalContainer}>
          <Box>
            {/* Modal header */}
            <Box
              sx={{
                position: "sticky",
                top: 0,
                left: "auto",
                right: "auto",
                minWidth: "10vw",
                maxWidth: "100vw",
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(1, 2),
                zIndex: 1,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottom: `1px solid ${theme.palette.grey[400]}`,
              }}
            >
              {/* Title of the modal */}
              <Typography variant="h6">Edit Category</Typography>
  
              {/* Close button */}
              <IconButton
                aria-label="close"
                onClick={() => setIsModalOpen(!isModalOpen)}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 5,
                  color: (theme) => theme.palette.grey[500],
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                <MdClose />
              </IconButton>
            </Box>
  
            {/* Modal content */}
            <Box sx={FullScreenModalContent}>
              <Box>
                {/* Grid layout for arranging form elements */}
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={theme.breakpoints.down("sm") ? 3 : 1}
                >
                  {/* Left side of the form */}
                  <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                    spacing={theme.breakpoints.down("sm") ? 2 : 1}
                    flexDirection="column"
                  >
                    <Grid item>
                      {/* Input field for the category name */}
                      <TextField
                        fullWidth
                        label="Category Name*"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item>
                      {/* Input field for the sort order */}
                      <TextField
                        fullWidth
                        label="Sort Order*"
                        variant="outlined"
                        size="small"
                        type="number"
                        inputProps={{
                          min: "1",
                          max: "100",
                          step: 1, // The increment/decrement step for the input value
                        }}
                      />
                    </Grid>
                    <Grid item>
                      {/* Select field for the category status */}
                      <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel>Status</InputLabel>
                        <Select label="Status">
                          <MenuItem value="merchant">Active</MenuItem>
                          <MenuItem value="admin">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
  
                  {/* Right side of the form */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {/* Component for image upload */}
                    <ImageUpload />
                  </Grid>
                </Grid>
  
                {/* Save and cancel buttons */}
                <Box mt={4}>
                  <SaveCancelButtons
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }
  
  export default AddEditCategory;
  