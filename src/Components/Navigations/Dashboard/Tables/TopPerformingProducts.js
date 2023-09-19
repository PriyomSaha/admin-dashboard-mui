import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TableImage } from "Components/Assets/GlobalStyles";
import { getTopProducts } from "Components/Assets/UIServices";
import ProductFallBack from "Components/UI/Images/ProductFallBack.svg";
import React from "react";

function TopPerformingProducts() {
  const [products, setProducts] = React.useState([]);

  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "product",
      label: "Product",
      minWidth: 100,
    },
    {
      id: "merchant",
      label: "Merchant",
      minWidth: 100,
    },
    {
      id: "qty",
      label: "Quantity",
      minWidth: 10,
      align: "center",
    },
  ];
  React.useEffect(() => {
    setProducts(getTopProducts());
  }, []);
  return (
    <>
      <Grid item xs={12} sm={12} md={6}>
        <Paper elevation={3}>
          <Typography variant="h5" align="left" pl={2} pt={1} fontWeight={600}>
            Top Performing Products
          </Typography>
          <TableContainer
            sx={{
              minHeight: 410,
              maxHeight: 500,
              overflowX: "auto",
            }}
          >
            <Table stickyHeader>
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: 600, textTransform: "uppercase" }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {products.map((value) => (
                  <TableRow key={value.id}>
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
                    <TableCell>{value.product}</TableCell>
                    <TableCell>
                      <a
                        href={`https://admin.zaperr.com/m/${value.merchantId}/dashboard`}
                      >
                        {value.merchant}
                      </a>
                    </TableCell>
                    <TableCell align="center">{value.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
}

export default TopPerformingProducts;
