import {
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";

function TopPerformingProducts() {
  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "product",
      label: "Product",
      minWidth: 150,
    },
    {
      id: "merchant",
      label: "Merchant",
      minWidth: 150,
    },
    {
      id: "qty",
      label: "Quantity",
      minWidth: 10,
    },
  ];
  return (
    <>
      <Grid item xs={12} sm={12} md={6}>
        <Paper elevation={3}>
          <Typography variant="h5" align="left" pl={2} pt={1} fontWeight={600}>
            Top Performing Products
          </Typography>
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
                      sx={{ fontWeight: 500, textTransform: "uppercase" }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
}

export default TopPerformingProducts;
