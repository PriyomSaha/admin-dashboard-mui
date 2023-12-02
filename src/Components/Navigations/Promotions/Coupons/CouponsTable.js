import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function CouponsTable() {
  // Define columns for the table
  const columns = [
    { id: "couponCode", label: "Coupon Code", minWidth: 200 },
    { id: "discountType", label: "Discount Type", minWidth: 100 },
    { id: "discountValue", label: "Discount Value", minWidth: 100 },
    { id: "usageLimit", label: "Usage Limit", minWidth: 100 },
    { id: "usageCount", label: "Usage Count", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 20, align: "center" },
    { id: "startDate", label: "Start Date", minWidth: 200, align: "center" },
    { id: "endDate", label: "End Date", minWidth: 200, align: "center" },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" },
  ];
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
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default CouponsTable;
