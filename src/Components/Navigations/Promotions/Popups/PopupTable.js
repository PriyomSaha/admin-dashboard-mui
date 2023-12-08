import {
  Box,
  Divider,
  Paper,
  Switch,
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
import { usePopupStore } from "Components/Assets/StateManagement";
import { getPopups } from "Components/Assets/UIServices";
import { theme } from "Components/UI/themes";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

function PopupTable() {
  // Define columns for the table
  const columns = [
    { id: "title", label: "Title", minWidth: 250 },
    { id: "type", label: "Type", minWidth: 100 },
    { id: "location", label: "Location", minWidth: 100 },
    { id: "frequency", label: "Frequency", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 20, align: "center" },
    { id: "actions", label: "Actions", minWidth: 150, align: "center" },
  ];

  // State for storing popups and handling pagination
  const [popups, setPopups] = React.useState([]);
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

  // Fetch popups on component mount
  React.useEffect(() => {
    setPopups(getPopups());
  }, []);

  // Access state and functions from the popup store using custom hooks
  const setPopupType = usePopupStore((state) => state.setPopupType);
  const setIsPopupModalOpen = usePopupStore(
    (state) => state.setIsPopupModalOpen
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
              {popups
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={value.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.type}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.frequency}
                      </Typography>
                    </TableCell>
                    {/* Status Switch */}
                    <TableCell align="center">
                      <Switch
                        defaultChecked={value.status}
                        sx={
                          !value.status
                            ? {
                                "& .MuiSwitch-thumb": {
                                  background: `${theme.palette.grey[300]}`,
                                },
                              }
                            : null
                        }
                      />
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
                            setPopupType("Edit");
                            setIsPopupModalOpen();
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
                        <Delete name={value.title} type="Popup" />
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
          count={popups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default PopupTable;
