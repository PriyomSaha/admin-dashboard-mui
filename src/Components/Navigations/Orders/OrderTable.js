import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Skeleton,
} from "@mui/material";
import OrderStatus from "./OrderStatus";
import Notes from "./Notes";
import { useOrdersStore } from "Components/Assets/StateManagement";

// Columns configuration for the table
const columns = [
  { id: "id", label: "Order Id", minWidth: 100 },
  { id: "d&t", label: "Date & Time", minWidth: 200 },
  {
    id: "merch",
    label: "Merchant",
    minWidth: 150,
  },
  {
    id: "cust",
    label: "Customer",
    minWidth: 150,
  },
  {
    id: "items",
    label: "Items",
    minWidth: 80,
  },
  {
    id: "total",
    label: "Total",
    minWidth: 100,
  },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
  },
  {
    id: "payment",
    label: "Payment",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 50,
  },
];

// Functional component 'OrderTable' to display orders in a table format
export default function OrderTable() {
  // State variables for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Custom hook 'useOrdersStore' to access 'isOrderLoading' state
  const isOrderLoading = useOrdersStore((state) => state.isOrderLoading);
  // Custom hook 'useOrdersStore' to access 'orders' state
  const orders = useOrdersStore((state) => state.ordersList);

  // Function to handle page change event
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change event
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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

          {/* Table Body */}
          <TableBody>
            {/* Display skeleton loading when 'isOrderLoading' is true */}
            {isOrderLoading
              ? // Number of rows per page should be the total skeleton count
                Array.from({ length: rowsPerPage }, (_, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="auto"
                          height="auto"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : // Display orders data when 'isOrderLoading' is false
                orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={value.id}
                    >
                      {/* Render each cell with the corresponding order data */}
                      <TableCell>{value.id}</TableCell>
                      <TableCell>{value.dateTime}</TableCell>
                      <TableCell>{value.merchant}</TableCell>
                      <TableCell>{value.customer}</TableCell>
                      <TableCell>{value.items}</TableCell>
                      <TableCell>₹{value.total}</TableCell>
                      <TableCell>{value.type}</TableCell>
                      <TableCell>{value.payment}</TableCell>
                      {/* Render OrderStatus component to display and manage order status */}
                      <TableCell>
                        <OrderStatus status={value.status} id={value.id} />
                      </TableCell>
                      {/* Render Notes component to display and manage order notes */}
                      <TableCell>
                        <Notes notes={value.notes} id={value.id} />
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
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
