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

export default function OrderTable({ orders }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const isOrderLoading = useOrdersLoadingStore((state) => state.isOrderLoading);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
      {/* <Box></Box> */}
      <TableContainer
        sx={{
          maxHeight: 440,
          overflowX: "auto",
        }}
      >
        <Table stickyHeader>
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
            {isOrderLoading ? (
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="auto"
                    height="auto"
                  />
                </TableCell>
              </TableRow>
            ) : (
              orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={value.id}>
                    <TableCell>{value.id}</TableCell>
                    <TableCell>{value.dateTime}</TableCell>
                    <TableCell>{value.merchant}</TableCell>
                    <TableCell>{value.customer}</TableCell>
                    <TableCell>{value.items}</TableCell>
                    <TableCell>₹{value.total}</TableCell>
                    <TableCell>{value.type}</TableCell>
                    <TableCell>{value.payment}</TableCell>
                    <TableCell>
                      <OrderStatus status={value.status} id={value.id} />
                    </TableCell>
                    <TableCell>
                      <Notes notes={value.notes} id={value.id} />
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
