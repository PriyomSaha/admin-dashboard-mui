import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { getCustomCharges, getOrderTypes } from "Components/Assets/UIServices";
import { CustomSwitch } from "Components/Assets/GlobalStyles";
import { IoEllipsisHorizontal } from "react-icons/io5";

function TypesTable({ setIsModalOpen }) {
  const columns = [
    {
      id: "name",
      label: "NAME",
      minwidth: "100",
    },
    {
      id: "status",
      label: "STATUS",
      minwidth: "50",
      align: "center",
    },
    {
      id: "form",
      label: "Form",
      minwidth: "50",
      align: "center",
    },
  ];

  const [orderTypes, setOrderTypes] = useState(getOrderTypes());

  return (
    <>
      <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
        <TableContainer
          sx={{
            maxHeight: "auto",
            overflowX: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: theme.palette.grey[900],
                      color: theme.palette.grey[100],
                      borderRight: `1px solid ${theme.palette.grey[100]}`,
                    }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: columns.minWidth }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                      }}
                      noWrap
                    >
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody component={Paper}>
              {orderTypes.map((item, index) => (
                <TableRow key={index}>
                  {/* Add table cells for each property in your data object */}
                  <TableCell>
                    <Typography variant="body1" fontWeight={600} noWrap>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <CustomSwitch checked={item.status} />
                  </TableCell>
                  <TableCell align="center">
                    <IoEllipsisHorizontal
                      size={25}
                      onClick={() => setIsModalOpen(true)}
                      cursor={"pointer"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default TypesTable;
