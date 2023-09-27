import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";
import OrderStatus from "./OrderStatus";
import { useOrdersLoadingStore } from "Components/Assets/StateManagement";
import Notes from "./Notes";

// Columns configuration for the table
const columns = [
  { id: "id", label: "Order Id", minWidth: 100 },
  { id: "d&t", label: "Date & Time", minWidth: 180 },
  {
    id: "merch",
    label: "Merchant",
    minWidth: 200,
  },
  {
    id: "cust",
    label: "Customer",
    minWidth: 200,
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
    minWidth: 130,
  },
  {
    id: "payment",
    label: "Payment",
    minWidth: 120,
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
export default function OrderTable({ orders }) {
  // State variables for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Custom hook 'useOrdersLoadingStore' to access 'isOrderLoading' state
  const isOrderLoading = useOrdersLoadingStore((state) => state.isOrderLoading);

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
              ? // Number of rows perpage should be the total skeleton count
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

/**Comments Explanation:

The code imports required modules and components from React and MUI (Material-UI) libraries.

The OrderTable functional component is responsible for displaying orders in a table format.

The columns constant represents the configuration for the columns of the table, specifying their ids, labels, and minimum widths.

The component uses the useState hook to manage the page and rowsPerPage state variables for pagination.

The component uses the custom hook useOrdersLoadingStore to access the isOrderLoading state, which is used for skeleton loading when orders are being fetched.

The functions handleChangePage and handleChangeRowsPerPage handle the page change and rows per page change events, respectively.

The component returns a Paper container with some styling properties.

Inside the Paper, there's a TableContainer that wraps the Table element to allow for horizontal scrolling when the content exceeds the container width.

The Table component includes TableHead and TableBody elements for organizing the header and body of the table.

The TableHead displays the column headers using the columns configuration.

The TableBody conditionally renders either skeleton loading rows or actual order data rows based on the isOrderLoading state.

When isOrderLoading is true, skeleton loading rows with placeholders are displayed.

When isOrderLoading is false, actual order data is displayed, and the data is paginated based on the page and rowsPerPage state variables.

Each order row displays cells with corresponding order data, including the order status and notes, using the OrderStatus and Notes components, respectively.

The TablePagination component provides pagination controls to navigate through the orders when there are more than the specified number of rows per page.
 */
