import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Delete from "Components/Assets/ReusableComp/Delete";
import { useCouponStore } from "Components/Assets/StateManagement";
import { getCoupons } from "Components/Assets/UIServices";
import { CustomSwitch } from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

function CouponsTable() {
  // Define columns for the table
  const columns = [
    { id: "couponCode", label: "Coupon Code", minWidth: 150 },
    { id: "discountType", label: "Discount Type", minWidth: 100 },
    { id: "discountValue", label: "Discount Value", minWidth: 100 },
    { id: "usageLimit", label: "Usage Limit", minWidth: 100 },
    { id: "usageCount", label: "Usage Count", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 20, align: "center" },
    { id: "startDate", label: "Start Date", minWidth: 200, align: "center" },
    { id: "endDate", label: "End Date", minWidth: 200, align: "center" },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" },
  ];

  // State for storing coupons and handling pagination
  const [coupons, setCoupons] = React.useState([]);
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

  // Fetch coupons on component mount
  React.useEffect(() => {
    setCoupons(getCoupons());
  }, []);

  // Access state and functions from the Coupon store using custom hooks
  const setCouponType = useCouponStore((state) => state.setCouponType);
  const setIsCouponModalOpen = useCouponStore(
    (state) => state.setIsCouponModalOpen
  );

  return (
    <>
      {/* Table container */}
      <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
        <TableContainer
          sx={{
            maxHeight: 440,
            overflowX: "auto",
          }}
        >
          {/* Table component with sticky header */}
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
              {coupons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={value.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight={550}>
                        {value.code}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.type}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.value}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.usageLimit}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.usageCount}
                      </Typography>
                    </TableCell>
                    {/* Status Switch */}
                    <TableCell align="center">
                      <CustomSwitch
                        checked={value.status}
                        // onChange={() => setEnabled(!enabled)}
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.startDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.endDate}
                      </Typography>
                    </TableCell>
                    {/* Edit and Delete Actions */}
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
                        {/* Edit Icon */}
                        <FaRegEdit
                          onClick={() => {
                            setCouponType("Edit");
                            setIsCouponModalOpen();
                          }}
                          style={{ fontSize: "25px", cursor: "pointer" }}
                        />
                        {/* Divider */}
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        {/* Delete Component */}
                        <Delete name={value.code} type="Coupon" />
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
          count={coupons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default CouponsTable;
