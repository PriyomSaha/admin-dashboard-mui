import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { SuperAdminLoginButton } from "Components/UI/GlobalStyles";
import { useCustomersLoadingStore } from "Components/Assets/StateManagement";
import { Skeleton } from "@mui/material";
import { FaAngleRight } from "react-icons/fa";
import CustomerStatus from "./CustomerStatus";
import Delete from "Components/Assets/ReusableComp/Delete";

const columns = [
  {
    id: "Name",
    label: "Name",
    minwidth: "150",
  },
  {
    id: "Email",
    label: "Email",
    minwidth: "200",
  },
  {
    id: "Phone",
    label: "Phone",
    minwidth: "200",
  },
  {
    id: "Status",
    label: "Status",
    minwidth: "100",
  },
  {
    id: "Action",
    label: "Action",
    minwidth: "50",
  },
  {
    id: "Autologin",
    label: "Autologin",
    minwidth: "100",
  },
];

export default function CustomerTable({ customers }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const isCustomersLoading = useCustomersLoadingStore(
    (state) => state.isCustomersLoading
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
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
                  style={{ minWidth: columns.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isCustomersLoading
              ? Array.from({ length: rowsPerPage }, (_, index) => (
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
              : customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  .map((value) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={value.id}
                    >
                      <TableCell>{value.Name}</TableCell>
                      <TableCell>{value.Email}</TableCell>
                      <TableCell>{value.Phone}</TableCell>
                      <TableCell>
                        <CustomerStatus status={value.status} />
                      </TableCell>
                      <TableCell>
                        <Delete name={value.Email} type="Customer" />
                      </TableCell>
                      <TableCell>
                        <SuperAdminLoginButton>
                          Login &nbsp;
                          <FaAngleRight />
                        </SuperAdminLoginButton>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
