import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles"; // Importing custom styles
import { theme } from "Components/UI/themes"; // Importing custom theme
import { FaRegEdit } from "react-icons/fa"; // Importing edit icon from react-icons/fa
import { MdClose } from "react-icons/md"; // Importing close icon from react-icons/md
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons"; // Importing SaveCancelButtons component
import ImageUpload from "Components/Assets/ReusableComp/EditImage/ImageUpload"; // Importing ImageUpload component
import axios from "axios"; // Importing Axios for HTTP requests
import { useCategoryStore } from "Components/Assets/StateManagement"; // Importing custom hook for state management
import { useEffect } from "react"; // Importing useEffect hook for side effects
import { updateDataInTable } from "Components/Assets/UIServices"; // Importing function to update data in a table

function AddEditCategory({
  categoryId,
  categoryName,
  setCategoryName,
  categoryDescription,
  setCategoryDescription,
  categoryStatus,
  setCategoryStatus,
  categoryImage,
  setCategoryImage,
  categoryGroup,
  setCategoryGroup,
  showSnackbar,
  setShowSnackbar,
  snackbarMessage,
  setSnackbarMessage,
  snackbarType,
  setSnackbarType,
}) {
  // State to manage the visibility of the modal
  const isCategoryModalOpen = useCategoryStore(
    (state) => state.isCategoryModalOpen
  );
  const setIsCategoryModalOpen = useCategoryStore(
    (state) => state.setIsCategoryModalOpen
  );

  // State to manage the type of category action (add or edit)
  const categoryType = useCategoryStore((state) => state.categoryType);
  const setCategoryType = useCategoryStore((state) => state.setCategoryType);

  // State to manage the list of all categories
  const setAllCategories = useCategoryStore((state) => state.setAllCategories);
  const setIsCategoriesLoading = useCategoryStore(
    (state) => state.setIsCategoriesLoading
  );
  const categories = useCategoryStore((state) => state.allCategories);

  // URL for category API
  const categoryUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND1 +
    process.env.REACT_APP_CATEGORY;

  // API key for authentication
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Function to fetch categories from the server
  const getCategories = async () => {
    await setIsCategoriesLoading(true);
    try {
      const requestHeader = {
        "X-API-Key": API_KEY,
      };
      // Make a GET request to fetch categories
      const resp = await axios.get(categoryUrl, {
        headers: requestHeader,
      });
      // Reverse the order of categories and update the state
      setAllCategories(resp.data.data.reverse());
    } catch (error) {
      console.log(error); // Log any errors
    } finally {
      await setIsCategoriesLoading(false); // Update loading state
    }
  };

  // Function to handle save operation
  const runOnSave = async () => {
    await setIsCategoriesLoading();

    // Request header for authentication
    const requestHeader = {
      "X-API-Key": API_KEY,
    };
    // Request body with category data
    const requestBody = {
      categoryName,
      categoryDescription,
      categoryImage,
      categoryStatus,
      categoryGroup,
    };

    if (categoryType.toUpperCase() === "ADD") {
      try {
        // Make a POST request to add a new category
        const resp = await axios.post(categoryUrl, requestBody, {
          headers: requestHeader,
        });
        if (!resp.error) {
          // Show success message
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);
          // Close modal and reset form fields
          setIsCategoryModalOpen();
          setCategoryName("");
          setCategoryDescription("");
          setCategoryStatus("0");
          setCategoryImage(null);
          setCategoryType("");
          setCategoryGroup("V")
          // Update list of categories
          getCategories();
        }
      } catch (error) {
        // Show error message if request fails
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Error in adding Category...");
      }
    } else {
      try {
        requestBody.id = categoryId;

        // Make a PUT request to update an existing category
        const resp = await axios.put(categoryUrl, requestBody, {
          headers: requestHeader,
        });
        if (!resp.error) {
          // Show success message
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);
          // Close modal and reset form fields
          setIsCategoryModalOpen();
          setCategoryName("");
          setCategoryDescription("");
          setCategoryStatus("0");
          setCategoryImage(null);
          setCategoryType("");
          // Update list of categories
          updateDataInTable(categories, requestBody, categoryId);
        }
      } catch (error) {
        // Show error message if request fails
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Error in Updating Category...");
      }
    }
    await setIsCategoriesLoading();
  };

  // useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {/* The modal dialog */}
      <Modal open={isCategoryModalOpen} sx={FullScreenModalContainer}>
        <Box>
          {/* Modal header */}
          <Box sx={FullScreenModalHeader}>
            {/* Title of the modal */}
            <Typography variant="h6">{categoryType} Category</Typography>

            {/* Close button */}
            <IconButton
              aria-label="close"
              onClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
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
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    {/* Input field for the category description */}
                    <TextField
                      fullWidth
                      label="Category Description*"
                      variant="outlined"
                      multiline
                      rows={3}
                      size="small"
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    {/* Select field for the category status */}
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        value={categoryStatus}
                        onChange={(e) => setCategoryStatus(e.target.value)}
                      >
                        <MenuItem value="1">Active</MenuItem>
                        <MenuItem value="0">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Radio field for the category status */}
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Category Type*</FormLabel>
                      <RadioGroup
                        value={categoryGroup}
                        onChange={(e) => setCategoryGroup(e.target.value)}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <FormControlLabel
                          value="V"
                          control={<Radio />}
                          label="Veg"
                        />
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Non-Veg"
                        />
                      </RadioGroup>
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
                  <ImageUpload
                    image={categoryImage}
                    setImage={setCategoryImage}
                  />
                </Grid>
              </Grid>

              {/* Save and cancel buttons */}
              <Box mt={4}>
                <SaveCancelButtons
                  isModalOpen={isCategoryModalOpen}
                  setIsModalOpen={setIsCategoryModalOpen}
                  runOnSave={runOnSave}
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
