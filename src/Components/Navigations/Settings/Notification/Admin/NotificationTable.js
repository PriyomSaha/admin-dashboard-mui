import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Divider,
  Box,
} from "@mui/material";
import { CustomSwitch } from "Components/Assets/GlobalStyles";
import { getNotificationEvents } from "Components/Assets/UIServices";
import { theme } from "Components/UI/themes";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";

function NotificationTable() {
  const columns = [
    {
      id: "events",
      label: "Events",
      minwidth: "2000",
    },
    {
      id: "sms",
      label: "SMS",
      minwidth: "100",
    },
    {
      id: "email",
      label: "EMail",
      minwidth: "100",
    },
    {
      id: "notifications",
      label: "Notifications",
      minwidth: "100",
    },
    {
      id: "action",
      label: "",
      minwidth: "50",
    },
  ];
  const [charges, setCharges] = useState(getNotificationEvents());
  // const [enabled, setEnabled] = useState(true);

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
              {charges.map((item, index) => (
                <TableRow key={index}>
                  {/* Add table cells for each property in your data object */}
                  <TableCell>
                    <Typography variant="body1" fontWeight={600} noWrap>
                      {item.name}
                    </Typography>
                    <Typography
                      fontWeight={300}
                      fontSize={13}
                      sx={{ color: theme.palette.grey[600] }}
                      noWrap
                    >
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <CustomSwitch />
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

export default NotificationTable;
