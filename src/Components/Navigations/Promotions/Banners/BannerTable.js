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
import { getBanners } from "Components/Assets/UIServices";
import { TableImage } from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import React from "react";
import AddEditBanner from "./AddEditBanner";
import BannerFallback from "Components/UI/Images/BannerFallback.svg";
import { FaRegEdit } from "react-icons/fa";
import { useBannerStore } from "Components/Assets/StateManagement";

function BannerTable() {
  // Define columns for the table
  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    { id: "name", label: "Name", minWidth: 250 },
    { id: "actionType", label: "Action Type", minWidth: 250 },
    { id: "actionValue", label: "Action Value", minWidth: 250 },
    { id: "status", label: "Status", minWidth: 20, align: "center" },
    { id: "sort", label: "Sort", minWidth: 20, align: "center" },
    { id: "actions", label: "Actions", minWidth: 150, align: "center" },
  ];

  // State for storing banners and handling pagination
  const [banners, setBanners] = React.useState([]);
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

  // Fetch banners on component mount
  React.useEffect(() => {
    setBanners(getBanners());
  }, []);

  // Access state and functions from the banner store using custom hooks
  const setBannerType = useBannerStore((state) => state.setBannerType);
  const setIsBannerModalOpen = useBannerStore(
    (state) => state.setIsBannerModalOpen
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
              {banners
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={value.id}>
                    {/* Banner Image */}
                    <TableCell>
                      <img
                        src={
                          value.imgUri.length === 0
                            ? BannerFallback
                            : value.imgUri
                        }
                        alt="Banner View"
                        style={TableImage}
                      />
                    </TableCell>
                    {/* Banner Name */}
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.name}
                      </Typography>
                    </TableCell>
                    {/* Action Type */}
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.actionType}
                      </Typography>
                    </TableCell>
                    {/* Action Value */}
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value.actionValue}
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
                    {/* Sort Order */}
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight={500}>
                        {value.sort}
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
                            setBannerType("Edit");
                            setIsBannerModalOpen();
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
                        <Delete name={value.name} type="Banner" />
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
          count={banners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Add/Edit Banner Modal */}
      <AddEditBanner />
    </>
  );
}

export default BannerTable;
