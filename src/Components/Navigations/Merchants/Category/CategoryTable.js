import React, { useState } from "react";
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
import CategoryFallBack from "Components/UI/Images/CategoriesFallBack.jpg";
import {
  useCategoryStore,
  useSnackbarStore,
} from "Components/Assets/StateManagement";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import {
  deleteDataFromTable,
  updateDataInTable,
} from "Components/Assets/UIServices";
import Delete from "Components/Assets/ReusableComp/Delete";

function CategoryTable({
  categoryId,
  setCategoryId,
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
}) {
  // Accessing alert snackbar data from global state
  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);

  // State variables and functions from custom hooks
  const isCategoriesLoading = useCategoryStore(
    (state) => state.isCategoriesLoading
  );
  const setIsCategoryModalOpen = useCategoryStore(
    (state) => state.setIsCategoryModalOpen
  );
  const setCategoryType = useCategoryStore((state) => state.setCategoryType);
  const categories = useCategoryStore((state) => state.allCategories);
  const setIsCategoriesLoading = useCategoryStore(
    (state) => state.setIsCategoriesLoading
  );
  const setAllCategories = useCategoryStore((state) => state.setAllCategories);

  // API endpoint and API key
  const categoryUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND1 +
    process.env.REACT_APP_CATEGORY;
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Table columns configuration
  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    { id: "category", label: "Category", minWidth: 200 },
    { id: "desc", label: "Description", minWidth: 300, align: "center" },
    { id: "group", label: "Category Group", minWidth: 50, align: "center" },
    { id: "status", label: "Status", minWidth: 20, align: "center" },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" },
  ];

  // State variables for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Function to handle page change event
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change event
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to handle editing a category
  const editCategory = async (value) => {
    await setCategoryType("Edit");
    await setIsCategoryModalOpen();
    await setCategoryName(value.categoryName);
    await setCategoryDescription(value.categoryDescription);
    await setCategoryStatus(value.categoryStatus);
    await setCategoryId(value.id);
    await setCategoryGroup(value.categoryGroup);
  };

  // Function to handle editing category status
  const editCategoryStatus = async (value) => {
    await setIsCategoriesLoading();

    try {
      const requestHeader = { "X-API-Key": API_KEY };
      const status = value.categoryStatus === "0" ? "1" : "0";
      const requestBody = { categoryStatus: status };

      const resp = await axios.put(`${categoryUrl}/${value.id}`, requestBody, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setShowSnackbar(true);
        await setSnackbarType("success");
        await setSnackbarMessage(resp.data.message);

        // Update the table data
        await updateDataInTable(
          categories,
          {
            ...requestBody,
            categoryName: value.categoryName,
            categoryDescription: value.categoryDescription,
            categoryImage: value.categoryImage,
            categoryGroup: value.categoryGroup,
          },
          value.id
        );
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Error in Updating Category Status...");
    }
    await setIsCategoriesLoading();
  };

  // Function to handle deleting a category
  const deleteCategory = async (id) => {
    await setIsCategoriesLoading();
    try {
      const requestHeader = { "X-API-Key": API_KEY };
      const resp = await axios.delete(`${categoryUrl}/${id}`, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setShowSnackbar(true);
        await setSnackbarType("success");
        await setSnackbarMessage(resp.data.message);

        // Update the table data after deletion
        await setAllCategories(await deleteDataFromTable(categories, id));
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Error in Deleting Category ...");
    }
    await setIsCategoriesLoading();
  };

  return (
    <>
      <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
        {/* Table container */}
        <TableContainer
          sx={{
            maxHeight: "60vh",
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
            {isCategoriesLoading ? (
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
              // Display actual data in the table body
              <TableBody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={value.id}
                    >
                      {/* Table cells */}
                      <TableCell>
                        {/* Display category image */}
                        <img
                          src={
                            value.categoryImage === null ||
                            value.categoryImage.length === 0
                              ? CategoryFallBack
                              : value.categoryImage
                          }
                          alt="Category View"
                          style={TableImage}
                        />
                      </TableCell>
                      <TableCell>
                        {/* Display category name */}
                        <Typography variant="body1" fontWeight={500}>
                          {value.categoryName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {/* Display category description */}
                        <Typography variant="body1" fontWeight={500}>
                          {value.categoryDescription}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {/* Display category group */}
                        <Typography variant="body1" fontWeight={500}>
                          {value.categoryGroup === "V" ? "Veg" : "Non-veg"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {/* Display category status switch */}
                        <CustomSwitch
                          checked={value.categoryStatus === "1" ? true : false}
                          onChange={() => editCategoryStatus(value)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {/* Display edit and delete actions */}
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
                          <FaRegEdit
                            onClick={() => editCategory(value)}
                            style={{ fontSize: "25px", cursor: "pointer" }}
                          />
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                          />
                          <Delete
                            name={value.categoryName}
                            type="Category"
                            runOnDelete={() => deleteCategory(value.id)}
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
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default CategoryTable;
