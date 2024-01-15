import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import { getCommissionReport } from "Components/Assets/UIServices";
import ShopFallBack from "Components/UI/Images/ShopFallBack.svg";
import { TableImage } from "Components/UI/GlobalStyles";

function ReviewTable() {
  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "merchantName",
      label: "Merchant Name",
      minWidth: 200,
    },
    {
      id: "orderCount",
      label: "Order Count",
      minWidth: 50,
    },
    {
      id: "grandTotal",
      label: "Grand Total",
      minWidth: 100,
    },
    {
      id: "commission",
      label: "Commission",
      minWidth: 100,
    },
  ];

  const [merchants, setMerchants] = React.useState([]);

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
    setMerchants(getCommissionReport());
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
              {merchants
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover tabIndex={-1} key={value.id}>
                    <TableCell>
                      {
                        <img
                          src={
                            value.imgUri.length == 0
                              ? ShopFallBack
                              : value.imgUri
                          }
                          alt="Shop View"
                          style={TableImage}
                        />
                      }
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.merchantName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.orderCount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        ₹ {value.total}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        ₹ {value.commission}
                      </Typography>
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
          count={merchants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default ReviewTable;
