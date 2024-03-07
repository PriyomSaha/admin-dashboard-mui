import React, { useEffect } from "react";
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
  Skeleton,
} from "@mui/material";
import {
  CustomSwitch,
  SuperAdminLoginButton,
  TableImage,
} from "Components/UI/GlobalStyles";
import ShopFallBack from "Components/UI/Images/ShopFallBack.svg";
import { FaAngleRight, FaRegEdit } from "react-icons/fa";
import "Components/UI/app.css";
import Delete from "Components/Assets/ReusableComp/Delete";
import {
  useMerchantStore,
  useSnackbarStore,
} from "Components/Assets/StateManagement";
import axios from "axios";
import { deleteDataFromTable } from "Components/Assets/UIServices";

function MerchantTable({
  id,
  setId,
  email,
  setEmail,
  name,
  setName,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  postalCode,
  setPostalCode,
  status,
  setStatus,
  orderType,
  setOrderType,
  deliveryBy,
  setDeliveryBy,
  merchantCategory,
  setMerchantCategory,
  businessType,
  setBusinessType,
  commisionType,
  setCommisionType,
  commisionValue,
  setCommisionValue,
  commisionCondition,
  setCommisionCondition,
}) {
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
  // Accessing alert snackbar data from global state
  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);

  // State variables and functions from custom hooks
  const isMerchantsLoading = useMerchantStore(
    (state) => state.isMerchantsLoading
  );

  const setIsMerchantsLoading = useMerchantStore(
    (state) => state.setIsMerchantsLoading
  );
  const merchants = useMerchantStore((state) => state.allMerchants);
  const setAllMerchants = useMerchantStore((state) => state.setAllMerchants);

  // API endpoint for merchant and API key
  const merchantsUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_MERCHANTS;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const setIsMerchantModalOpen = useMerchantStore(
    (state) => state.setIsMerchantModalOpen
  );
  const setMerchantType = useMerchantStore((state) => state.setMerchantType);

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

  const editMerchant = async (value) => {
    await setMerchantType("Edit");
    await setIsMerchantModalOpen();
    await setId(value.id);
    await setEmail(value.email);
    await setName(value.name);
    await setPhoneNumber(value.phone);
    await setCountry(value.location[0].address.country);
    await setAddress(value.location[0].address.address1);
    await setState(value.location[0].address.state);
    await setCity(value.location[0].address.city);
    await setPostalCode(value.location[0].address.postalCode);
    await setStatus(value.status);
    await setOrderType(value.orderType);
    await setDeliveryBy(value.deliveryBy);
    await setMerchantCategory(value.categories);
    await setBusinessType(value.businessType);
    await setCommisionType(value.commissionType.type);
    await setCommisionValue(value.commissionType.value);
    await setCommisionCondition(value.commissionType.condition);
  };

  const deleteMerchant = async (id) => {
    await setIsMerchantsLoading();
    try {
      const requestHeader = { "X-API-Key": API_KEY };
      const resp = await axios.delete(`${merchantsUrl}/${id}`, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setShowSnackbar(true);
        await setSnackbarType("success");
        await setSnackbarMessage(resp.data.message);

        // Update the table data after deletion
        await setAllMerchants(await deleteDataFromTable(merchants, id));
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Error in Deleting Product ...");
    }
    await setIsMerchantsLoading();
  };

  return (
    <>
      <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
        {/* Table container */}

        {isMerchantsLoading ? (
          <TableContainer
            sx={{
              maxHeight: 440,
              overflowX: "auto",
            }}
          >
            {" "}
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
              {Array.from({ length: rowsPerPage }, (_, index) => (
                <TableBody>
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Skeleton
                          variant={column.id === "img" ? "rect" : "text"}
                          animation="wave"
                          width={column.id === "img" ? 30 : "auto"}
                          height={column.id === "img" ? 30 : "auto"}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        ) : merchants.length > 0 ? (
          <>
            <TableContainer
              sx={{
                overflowX: "auto",
              }}
            >
              <Table stickyHeader>
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={value.id}
                      >
                        <TableCell>
                          {
                            <img
                              src={
                                // value.merchantImage === null ||
                                // value.merchantImage.length === 0
                                // ?
                                ShopFallBack
                                // : value.merchantImage
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
                            {value.location[0].address.address1}{" "}
                            {value.location[0].address.address2}
                            {" , "}
                            {value.location[0].address.city}
                            {" , "}
                            {value.location[0].address.state}
                            {" , "}
                            {value.location[0].address.postalCode}
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
                            checked={value.status === "active" ? true : false}
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
                            <FaRegEdit
                              onClick={() => {
                                editMerchant(value);
                              }}
                              style={{ fontSize: "25px", cursor: "pointer" }}
                            />
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                            />
                            <Delete
                              name={value.name}
                              type="Merchant"
                              runOnDelete={() => deleteMerchant(value.id)}
                            />
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
          </>
        ) : (
          <Box py={2}>
            <Typography variant="h5" textAlign={"center"}>
              You have no merchants under you .
            </Typography>
          </Box>
        )}
      </Paper>
    </>
  );
}

export default MerchantTable;
