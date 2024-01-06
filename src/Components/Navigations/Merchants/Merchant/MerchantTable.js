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
  Checkbox,
  Divider,
  Box,
  TablePagination,
} from "@mui/material";
import {
  CustomSwitch,
  SuperAdminLoginButton,
  TableImage,
} from "Components/UI/GlobalStyles";
import ShopFallBack from "Components/UI/Images/ShopFallBack.svg";
import { FaAngleRight } from "react-icons/fa";
import "Components/UI/app.css";
import { getMerchants } from "Components/Assets/UIServices";
import Delete from "Components/Assets/ReusableComp/Delete";
import { theme } from "Components/UI/themes";
import EditMerchant from "Components/Navigations/Merchants/Merchant/AddEditMerchant/index";

function MerchantTable() {
  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "merch",
      label: "Merchant",
      minWidth: 200,
    },
    {
      id: "feature",
      label: "Featured",
      minWidth: 20,
    },
    {
      id: "sponsored",
      label: "Sponsored",
      minWidth: 20,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 20,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
    },
    {
      id: "login",
      label: "Auto Login",
      minWidth: 120,
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
    setMerchants(getMerchants());
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={value.id}>
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
                        {value.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={400}
                        fontSize={12}
                      >
                        {value.address}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked={value.featured} />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked={value.sponsored} />
                    </TableCell>
                    <TableCell>
                      <CustomSwitch
                        checked={value.status}
                        // onChange={() => setEnabled(!enabled)}
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "fit-content",

                          "& svg": {
                            m: 1,
                          },
                        }}
                      >
                        <EditMerchant merchantName={value.name} />

                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />

                        <Delete name={value.name} type="Merchant" />
                      </Box>
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

export default MerchantTable;
