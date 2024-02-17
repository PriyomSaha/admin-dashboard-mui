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
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import ImageUpload from "Components/Assets/ReusableComp/EditImage/ImageUpload";
import { useProductStore } from "Components/Assets/StateManagement";
import axios from "axios";
import CompactChipInputSelect from "Components/Assets/ReusableComp/CompactChipInputSelect";
import { getCookie, updateDataInTable } from "Components/Assets/UIServices";

function AddEditProduct({
  productId,
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  productPrice,
  setProductPrice,
  productAvailability,
  setProductAvailability,
  productImage,
  setProductImage,
  selectedCategories,
  setSelectedCategory,
  showSnackbar,
  setShowSnackbar,
  snackbarMessage,
  setSnackbarMessage,
  snackbarType,
  setSnackbarType,
}) {
  // State to manage the visibility of the modal
  const isProductModalOpen = useProductStore(
    (state) => state.isProductModalOpen
  );
  const setIsProductModalOpen = useProductStore(
    (state) => state.setIsProductModalOpen
  );
  const setAllProducts = useProductStore((state) => state.setAllProducts);
  const products = useProductStore((state) => state.allProducts);

  const setIsProductsLoading = useProductStore(
    (state) => state.setIsProductsLoading
  );
  // State to manage the type of product action (add or edit)
  const productType = useProductStore((state) => state.productType);
  const setProductType = useProductStore((state) => state.setProductType);

  const [activeCategories, setActiveCategories] = useState([]);

  // URL for category API
  const activeCategoryUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND1 +
    process.env.REACT_APP_ACTIVE_CATEGORY;

  // URL for category API
  const productUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND1 +
    process.env.REACT_APP_PRODUCT;

  // API key for authentication
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Function to fetch active categories from the server
  const getActiveCategories = async () => {
    try {
      const requestHeader = {
        "X-API-Key": API_KEY,
      };
      // Make a GET request to fetch categories
      const resp = await axios.get(activeCategoryUrl, {
        headers: requestHeader,
      });
      if (!resp.data.error) {
        setActiveCategories(resp.data.data);
      }
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Function to fetch products from the server
  const getProducts = async () => {
    await setIsProductsLoading();
    try {
      const requestHeader = {
        "X-API-Key": API_KEY,
      };
      // Make a GET request to fetch products
      const resp = await axios.get(`${productUrl}/${getCookie("uid")}`, {
        headers: requestHeader,
      });
      // Reverse the order of products and update the state
      setAllProducts(resp.data.data.reverse());
    } catch (error) {
      console.log(error); // Log any errors
    } finally {
      await setIsProductsLoading(); // Update loading state
    }
  };

  // Function to handle save operation
  const runOnSave = async () => {
    await setIsProductsLoading();

    // Request header for authentication
    const requestHeader = {
      "X-API-Key": API_KEY,
    };
    // Request body with products data
    const requestBody = {
      restaurantID: getCookie("uid"),
      itemName: productName,
      itemPrice: parseInt(productPrice),
      itemDescription: productDescription,
      itemImage: productImage,
      isAvailable: productAvailability,
      categories: selectedCategories,
    };
    if (productType.toUpperCase() === "ADD") {
      try {
        // Make a POST request to add a new products
        const resp = await axios.post(productUrl, requestBody, {
          headers: requestHeader,
        });
        if (!resp.error) {
          // Show success message
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);
          // Close modal and reset form fields
          setIsProductModalOpen();
          setProductName("");
          setProductDescription("");
          setProductPrice();
          setProductAvailability(false);
          setProductImage(null);
          setSelectedCategory([]);
          // Update list of Products
          getProducts();
        }
      } catch (error) {
        // Show error message if request fails
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Error in adding Product...");
      }
    } else {
      try {
        requestBody.id = productId;
        // Make a POST request to add a new products
        const resp = await axios.put(productUrl, requestBody, {
          headers: requestHeader,
        });
        if (!resp.error) {
          // Show success message
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);
          // Close modal and reset form fields
          setIsProductModalOpen();
          setProductName("");
          setProductDescription("");
          setProductPrice();
          setProductAvailability(false);
          setProductImage(null);
          setSelectedCategory([]);
          // Update list of Products
          updateDataInTable(products, requestBody, productId);
        }
      } catch (error) {
        // Show error message if request fails
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Error in Updating Product...");
      }
    }
    await setIsProductsLoading();
  };

  useEffect(() => {
    if (isProductModalOpen) getActiveCategories();
  }, [isProductModalOpen]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* The modal dialog */}
      <Modal open={isProductModalOpen} sx={FullScreenModalContainer}>
        <Box>
          {/* Modal header */}
          <Box sx={FullScreenModalHeader}>
            {/* Title of the modal */}
            <Typography variant="h6">{productType} Product</Typography>

            {/* Close button */}
            <IconButton
              aria-label="close"
              onClick={() => setIsProductModalOpen()}
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
                    {/* Input field for the product name */}
                    <TextField
                      fullWidth
                      label="Product Name*"
                      variant="outlined"
                      size="small"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    {/* Input field for the product description */}
                    <TextField
                      fullWidth
                      label="Product Description*"
                      variant="outlined"
                      multiline
                      rows={3}
                      size="small"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    {/* Input field for the product description */}
                    <TextField
                      fullWidth
                      label="Product Price*"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        type: "number",
                        min: "1",
                        max: "1000",
                        step: "1",
                      }}
                      value={productPrice}
                      onChange={(e) => {
                        const input = e.target.value;
                        // Check if input is a number and within the specified range
                        if (
                          !isNaN(input) &&
                          parseInt(input) >= 1 &&
                          parseInt(input) <= 1000
                        ) {
                          setProductPrice(input);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item>
                    {/* Select field for the product status */}
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Availability</InputLabel>
                      <Select
                        label="Availability"
                        value={productAvailability}
                        onChange={(e) => setProductAvailability(e.target.value)}
                      >
                        <MenuItem value={true}>Available</MenuItem>
                        <MenuItem value={false}>Not Available</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <CompactChipInputSelect
                      totalList={activeCategories}
                      selectedItems={selectedCategories}
                      setSelectedItems={setSelectedCategory}
                      inputLabelText="Categories"
                    />
                  </Grid>
                </Grid>

                {/* Right side of the form */}
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {selectedCategories.length > 0 ? (
                    <Grid item>
                      <Box my={1}>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          textAlign={"left"}
                        >
                          Categories Added are
                        </Typography>
                        <Box
                          mt={0.5}
                          display={"flex"}
                          flexDirection={"row"}
                          flexWrap={"wrap"}
                        >
                          {selectedCategories.map((item, index) => (
                            <Typography variant="body2">
                              <i>
                                {index + 1}.{item}&nbsp;
                              </i>
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  ) : null}
                  {/* Component for image upload */}
                  <Grid item>
                    <ImageUpload
                      image={productImage}
                      setImage={setProductImage}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Save and cancel buttons */}
              <Box mt={4}>
                <SaveCancelButtons
                  isModalOpen={isProductModalOpen}
                  setIsModalOpen={setIsProductModalOpen}
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

export default AddEditProduct;
