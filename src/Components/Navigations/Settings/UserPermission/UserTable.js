import {
  Box,
  Chip,
  Divider,
  Paper,
  Skeleton,
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
import {
  deleteDataFromTable,
  getCookie,
  getFormattedDate,
} from "Components/Assets/UIServices";
import React, { useEffect, useState } from "react";
import { theme } from "Components/UI/themes";
import Status from "./Status";
import axios from "axios";
import {
  useAccountStore,
  useInvitedUserStore,
} from "Components/Assets/StateManagement";
import { FaRegEdit } from "react-icons/fa";
import Overlay from "Components/Assets/ReusableComp/Overlay";

function UserTable({
  showSnackbar,
  setShowSnackbar,
  snackbarMessage,
  setSnackbarMessage,
  snackbarType,
  setSnackbarType,
  email,
  setEmail,
  userName,
  setUserName,
  permissions,
  setPermissions,
}) {
  const columns = [
    {
      id: "email",
      label: "Email",
      minWidth: 100,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 80,
      align: "center",
    },
    {
      id: "added",
      label: "Added",
      minWidth: 100,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "center",
    },
  ];

  const [showOverlay, setShowOverlay] = useState(false); // While sending invite

  // State variables for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [permissions, setPermissions] = useState([]);

  // Function to handle page change event
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Function to handle rows per page change event
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isInvitedUsersLoading = useInvitedUserStore(
    (state) => state.isInvitedUsersLoading
  );

  const setIsInvitedUserModalOpen = useInvitedUserStore(
    (state) => state.setIsInvitedUserModalOpen
  );
  const setInvitedUserType = useInvitedUserStore(
    (state) => state.setInvitedUserType
  );
  const setAllInvitedUsers = useInvitedUserStore(
    (state) => state.setAllInvitedUsers
  );
  const users = useInvitedUserStore((state) => state.allInvitedUsers);
  // const setPermissions = useInvitedUserStore((state) => state.setPermissions);

  const inviterEmail = useAccountStore((state) => state.userData.email);
  // API endpoint and API key

  const resendInviteUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_RESEND_INVITE;

  const usersInvitedUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_INVITED_USERS_LIST;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const resendInvite = async (inviteeEmail) => {
    await setShowOverlay(true);
    try {
      const requestHeader = { "X-API-Key": API_KEY };
      const requestbody = {
        emailFrom: inviterEmail,
        emailTo: inviteeEmail,
      };
      const resp = await axios.post(resendInviteUrl, requestbody, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setShowSnackbar(true);
        await setSnackbarMessage("Invite Re-sent!!");
        await setSnackbarType("success");
      }
    } catch (error) {
      console.log(error);
    }
    await setShowOverlay(false);
  };

  const deleteUser = async (id) => {
    await setShowOverlay(true);
    try {
      const requestHeader = { "X-API-Key": API_KEY };

      const resp = await axios.delete(`${usersInvitedUrl}/${id}`, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setShowSnackbar(true);
        await setSnackbarMessage("Deleted Successfully !!");
        await setSnackbarType("success");
        await setAllInvitedUsers(await deleteDataFromTable(users, id));
      }
    } catch (error) {
      console.log(error);
    }
    await setShowOverlay(false);
  };
  let perms = [];
  const transformedArray = (value) => {
    value.map((item) => {
      const newObj = {};
      newObj[item.category] = item.actions;
      perms.push(newObj);
    });
    console.log(perms);
    return perms;
  };
  const editUserPermissions = async (value) => {
    // setPermissions(transformedArray(value.profile.roles.permissions));
    // Update permissions using the callback version of setPermissions
    await setPermissions([
      {
        Merchants: ["Merchants", "Category", "Product"],
      },
      {
        Orders: ["Orders"],
      },
      {
        Reports: ["Reports", "Export Reports"],
      },
    ]);
    await setEmail(value.email);
    await setUserName(value.username);
    await setIsInvitedUserModalOpen();
    await setInvitedUserType("Edit");
    // setPermissions();
  };

  return (
    <>
      <Paper sx={{ overflowX: "auto", mt: 2, width: "100%" }}>
        {/* Table container */}
        {isInvitedUsersLoading ? (
          <TableContainer
            sx={{
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
              {Array.from({ length: rowsPerPage }, (_, index) => (
                <TableBody>
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="auto"
                          height="auto"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        ) : users.length > 0 ? (
          <>
            <TableContainer
              sx={{
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
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((value) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={value.id}
                      >
                        <TableCell>
                          <Typography variant="body1" fontWeight={500}>
                            {value.email}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Status
                            oldStatus={value.profile.accountStatus}
                            resendInvite={() => resendInvite(value.email)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight={500}>
                            {getFormattedDate(value.createdAt)}
                          </Typography>
                        </TableCell>
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
                            <FaRegEdit
                              onClick={() => editUserPermissions(value)}
                              style={{ fontSize: "25px", cursor: "pointer" }}
                            />
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                            />

                            <Delete
                              name={value.email}
                              type="User"
                              runOnDelete={() => deleteUser(value.id)}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Box py={2}>
            <Typography variant="h5" textAlign={"center"}>
              You have not invited any user yet .
            </Typography>
          </Box>
        )}
      </Paper>
      <Overlay showOverlay={showOverlay} />
    </>
  );
}

export default UserTable;
