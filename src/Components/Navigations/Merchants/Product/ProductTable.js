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
import { getProducts } from "Components/Assets/UIServices";
import React from "react";
import ProductFallBack from "Components/UI/Images/ProductFallBack.svg";
import { theme } from "Components/UI/themes";
import Delete from "Components/Assets/ReusableComp/Delete";
import AddEditProduct from "./AddEditProduct";

function ProductTable() {
  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "product",
      label: "Product",
      minWidth: 250,
    },
    {
      id: "merchant",
      label: "Merchant",
      minWidth: 250,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 50,
    },
    {
      id: "published",
      label: "Published",
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

  const [products, setProducts] = React.useState([]);

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
    setProducts(getProducts());
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={value.id}>
                    <TableCell>
                      {
                        <img
                          src={
                            value.imgUri.length == 0
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
                        {value.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://admin.zaperr.com/m/${value.merchantId}/dashboard`}
                      >
                        {value.merchant}
                      </a>
                    </TableCell>
                    <TableCell>{value.price}</TableCell>
                    <TableCell align="center">
                      <Switch
                        defaultChecked={value.published}
                        sx={
                          !value.published
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
                        {/* <AddEditProduct />
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        /> */}
                        <Delete name={value.name} type="Product" />
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
