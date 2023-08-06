import {
  Box,
  Divider,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { TableImage } from "Components/Assets/GlobalStyles";
import { getCategories } from "Components/Assets/UIServices";
import React from "react";
import CategoryFallBack from "Components/UI/Images/CategoriesFallBack.jpg";
import { theme } from "Components/UI/themes";
import AddEditCategory from "Components/Navigations/Merchants/Category/AddEditCategory";
import Delete from "Components/Assets/ReusableComp/Delete";

function CategoryTable() {
  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "category",
      label: "Category",
      minWidth: 250,
    },
    {
      id: "sort",
      label: "Sort Order",
      minWidth: 20,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 20,
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "center",
    },
  ];

  const [categories, setCategories] = React.useState([]);

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

  React.useEffect(() => {
    setCategories(getCategories());
  }, []);

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

            <TableBody>
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={value.id}>
                    <TableCell>
                      {
                        <img
                          src={
                            value.imgUri.length == 0
                              ? CategoryFallBack
                              : value.imgUri
                          }
                          alt="Shop View"
                          style={TableImage}
                        />
                      }
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.sortOrder}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        defaultChecked={value.status}
                        sx={
                          !value.status
                            ? {
                                "& .MuiSwitch-thumb": {
                                  background: `${theme.palette.grey[300]}`,
                                },
                              }
                            : null
                        }
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
                        <AddEditCategory />

                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />

                        <Delete name={value.name} type="Category" />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
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
