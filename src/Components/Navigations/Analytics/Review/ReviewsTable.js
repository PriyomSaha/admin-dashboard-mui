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
  Rating,
} from "@mui/material";
import { getReviews } from "Components/Assets/UIServices";
function ReviewTable() {
  const columns = [
    {
      id: "rating",
      label: "Rating",
      minWidth: 100,
    },
    {
      id: "review",
      label: "Review",
      minWidth: 100,
    },
    {
      id: "orderId",
      label: "Order Id",
      minWidth: 50,
    },
    {
      id: "customerName",
      label: "Customer Name",
      minWidth: 200,
    },
    {
      id: "merchantName",
      label: "Merchant Name",
      minWidth: 200,
    },
    {
      id: "date&Time",
      label: "Date & Time",
      minWidth: 200,
    },
  ];

  const [reviews, setReviews] = React.useState([]);

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
    setReviews(getReviews());
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
              {reviews
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover tabIndex={-1} key={value.orderId}>
                    <TableCell>
                      <Rating
                        precision={0.5}
                        size="small"
                        value={value.rating}
                        // onChange={(event, newValue) => {
                        //   setValue(newValue);
                        // }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.review}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.merchantName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.dateTime}
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
          count={reviews.length}
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
