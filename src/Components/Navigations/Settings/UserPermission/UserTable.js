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
  useSnackbarStore,
} from "Components/Assets/StateManagement";
import { FaRegEdit } from "react-icons/fa";
import Overlay from "Components/Assets/ReusableComp/Overlay";

function UserTable({
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

  const inviterEmail = useAccountStore((state) => state.userData.email);

  // Accessing alert snackbar data from global state
  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);

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
        // await setSnackbarMessage("Invite Re-sent!!");
        await setSnackbarMessage(resp.data.message);

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
        await setSnackbarMessage(resp.data.message);
        await setSnackbarType("success");
        await setAllInvitedUsers(await deleteDataFromTable(users, id));
      }
    } catch (error) {
      console.log(error);
    }
    await setShowOverlay(false);
  };
  let perms = [];

  const editUserPermissions = async (value) => {
    if (value.profile.roles.permissions !== null) {
      const transformedArray = value.profile.roles.permissions.map((item) => {
        const newObj = {};
        newObj[item.category] = item.actions;
        return newObj;
      });
      perms = transformedArray;
    } else perms = [];

    await setPermissions(perms);
    // Update permissions using the callback version of setPermissions
    await setEmail(value.email);
    await setUserName(value.username);
    await setIsInvitedUserModalOpen();
    await setInvitedUserType("Edit");
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
                            value={value}
                            resendInvite={() => resendInvite(value.email)}
                            setShowSnackbar={setShowSnackbar}
                            setSnackbarMessage={setSnackbarMessage}
                            setSnackbarType={setSnackbarType}
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
