import {
  Box,
  Divider,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { CustomSwitch, TableImage } from "Components/UI/GlobalStyles";
import {
  deleteDataFromTable,
  getCookie,
  getProducts,
  updateDataInTable,
} from "Components/Assets/UIServices";
import React from "react";
import ProductFallBack from "Components/UI/Images/ProductFallBack.svg";
import { theme } from "Components/UI/themes";
import Delete from "Components/Assets/ReusableComp/Delete";
import { FaRegEdit } from "react-icons/fa";
import {
  useAccountStore,
  useProductStore,
} from "Components/Assets/StateManagement";
import axios from "axios";

function ProductTable({
  productId,
  setProductid,
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
  const userRole = useAccountStore((state) => state.userData.role);

  // State variables and functions from custom hooks
  const isProductsLoading = useProductStore((state) => state.isProductsLoading);

  const setIsProductsLoading = useProductStore(
    (state) => state.setIsProductsLoading
  );
  const setIsProductModalOpen = useProductStore(
    (state) => state.setIsProductModalOpen
  );
  const setProductType = useProductStore((state) => state.setProductType);

  const products = useProductStore((state) => state.allProducts);
  const setAllProducts = useProductStore((state) => state.setAllProducts);

  // API endpoint and API key
  const productUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND1 +
    process.env.REACT_APP_PRODUCT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "product",
      label: "Product",
      minWidth: 200,
    },
    {
      id: "productDescription",
      label: "Product Description",
      minWidth: 250,
    },
    {
      id: "merchant",
      label: "Merchant",
      minWidth: 100,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 50,
    },
    {
      id: "available",
      label: "Availabile",
      minWidth: 20,
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 50,
      align: "center",
    },
  ];

  // State variables for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Function to handle page change event
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change event
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editProduct = async (value) => {
    await setProductType("Edit");
    await setIsProductModalOpen();
    await setProductid(value.id);
    await setProductName(value.itemName);
    await setProductDescription(value.itemDescription);
    await setProductPrice(value.itemPrice);
    await setProductAvailability(value.isAvailable);
    await setProductImage(value.itemImage);
    await setSelectedCategory(value.categories);
  };

  // Function to handle editing category status
  const editProductAvailibility = async (value) => {
    await setIsProductsLoading();

    try {
      const requestHeader = { "X-API-Key": API_KEY };
      // const status = value.categoryStatus === "0" ? "1" : "0";
      const requestBody = { isAvailable: !value.isAvailable };

      const resp = await axios.put(productUrl, requestBody, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setShowSnackbar(true);
        await setSnackbarType("success");
        await setSnackbarMessage(resp.data.message);

        // Update the table data
        await updateDataInTable(
          products,
          {
            ...requestBody,
            restaurantID: getCookie("uid"),
            itemPrice: value.itemPrice,
            itemName: value.itemName,
            itemDescription: value.itemDescription,
            itemImage: value.itemImage,
            categories: value.categories,
          },
          value.id
        );
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Error in Updating Product Availibility...");
    }
    await setIsProductsLoading();
  };

  const deleteProduct = async (id) => {
    await setIsProductsLoading();
    try {
      const requestHeader = { "X-API-Key": API_KEY };
      const resp = await axios.delete(`${productUrl}/${id}`, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setShowSnackbar(true);
        await setSnackbarType("success");
        await setSnackbarMessage(resp.data.message);

        // Update the table data after deletion
        await setAllProducts(await deleteDataFromTable(products, id));
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Error in Deleting Product ...");
    }
    await setIsProductsLoading();
  };

  return (
    <>
      <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
        {/* Table container */}
        <TableContainer
          sx={{
            maxHeight: 440,
            overflowX: "auto",
          }}
        >
          <Table stickyHeader>
            {/* Table Head */}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ fontWeight: 700 }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isProductsLoading ? (
              // Display skeleton rows while data is loading
              Array.from({ length: rowsPerPage }, (_, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton
                        variant={column.id === "img" ? "rect" : "text"}
                        animation="wave"
                        width={column.id === "img" ? 30 : "auto"}
                        height={column.id === "img" ? 30 : "auto"}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={value.id}
                    >
                      <TableCell>
                        {
                          <img
                            src={
                              value.itemImage === null ||
                              value.itemImage.length === 0
                                ? ProductFallBack
                                : value.imgUri
                            }
                            alt="Shop View"
                            style={TableImage}
                          />
                        }
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight={500}>
                          {value.itemName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight={500}>
                          {value.itemDescription}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://admin.zaperr.com/m/${value.merchantId}/dashboard`}
                        >
                          {value.merchant}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight={500}>
                          ₹{value.itemPrice}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <CustomSwitch
                          checked={value.isAvailable}
                          onChange={() => editProductAvailibility(value)}
                          inputProps={{ "aria-label": "ant design" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "center",

                            "& svg": {
                              m: 1,
                            },
                          }}
                        >
                          {userRole.toUpperCase() === "MANAGER" ? (
                            <>
                              <FaRegEdit
                                onClick={() => editProduct(value)}
                                style={{ fontSize: "25px", cursor: "pointer" }}
                              />
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                              />
                            </>
                          ) : null}

                          <Delete
                            name={value.itemName}
                            type="Product"
                            runOnDelete={() => deleteProduct(value.id)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default ProductTable;
