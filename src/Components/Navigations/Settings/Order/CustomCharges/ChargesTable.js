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
import { CustomSwitch } from "Components/UI/GlobalStyles";
import { getCustomCharges } from "Components/Assets/UIServices";
import { theme } from "Components/UI/themes";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";

function ChargesTable() {
  const columns = [
    {
      id: "chargeName",
      label: "Charge Name",
      minwidth: "350",
    },
    {
      id: "applicableOn",
      label: "Applicable On",
      minwidth: "100",
    },
    {
      id: "rule",
      label: "Rule",
      minwidth: "300",
      align: "center",
    },
    {
      id: "Status",
      label: "Status",
      minwidth: "100",
    },
  ];
  const [charges, setCharges] = useState(getCustomCharges());
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
                      {item.chargeName}
                    </Typography>
                    <Typography
                      fontWeight={300}
                      fontSize={13}
                      sx={{ color: theme.palette.grey[600] }}
                      noWrap
                    >
                      {item.chargeDescription}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.applicableOn}</TableCell>
                  <TableCell>
                    {item.applicableOn === "Global" ? (
                      <>
                        <Typography
                          fontWeight={300}
                          fontSize={13}
                          sx={{ color: theme.palette.grey[600] }}
                          noWrap
                        >
                          Value : <b>{item.rule.value}</b>
                        </Typography>
                        <Typography
                          fontWeight={300}
                          fontSize={13}
                          sx={{ color: theme.palette.grey[600] }}
                          noWrap
                        >
                          Order Type :
                          {item.rule.orderType.map((types, index) => (
                            <b key={index}> {types} &nbsp;</b>
                          ))}
                        </Typography>
                      </>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Stack direction={"row"} justifyContent={"space-around"}>
                      <CustomSwitch
                        checked={item.status}
                        // onChange={() => setEnabled(!enabled)}
                        inputProps={{ "aria-label": "ant design" }}
                      />
                      <FaEdit size={30} color="var(--links)" />
                    </Stack>
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

export default ChargesTable;
