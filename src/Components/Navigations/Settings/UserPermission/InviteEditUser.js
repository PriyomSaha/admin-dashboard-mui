import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
} from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import PermissionList from "./PermissionList";
import UserDetails from "./UserDetails";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import axios from "axios";
import Overlay from "Components/Assets/ReusableComp/Overlay";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";
import { getCookie } from "Components/Assets/UIServices";
import { useInvitedUserStore } from "Components/Assets/StateManagement";

function InviteEditUser({
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
  // State to control the visibility of the modal, selected permissions, and email input
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const setIsInvitedUserModalOpen = useInvitedUserStore(
    (state) => state.setIsInvitedUserModalOpen
  );
  const isInvitedUserModalOpen = useInvitedUserStore(
    (state) => state.isInvitedUserModalOpen
  );

  const invitedUserType = useInvitedUserStore((state) => state.invitedUserType);

  const setAllInvitedUsers = useInvitedUserStore(
    (state) => state.setAllInvitedUsers
  );
  const setIsInvitedUsersLoading = useInvitedUserStore(
    (state) => state.setIsInvitedUsersLoading
  );

  const [showOverlay, setShowOverlay] = useState(false); // While sending invite

  const API_KEY = process.env.REACT_APP_API_KEY;

  // Endpoint for user invitation
  const inviteUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_INVITE_USER_URL;

  const usersInvitedUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_INVITED_USERS_LIST;

  const updatePermissionsUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_UPDATE_PERMS;

  const getUsers = async () => {
    await setIsInvitedUsersLoading();
    try {
      const requestHeader = { "X-API-Key": API_KEY };
      const resp = await axios.get(`${usersInvitedUrl}/${getCookie("uid")}`, {
        headers: requestHeader,
      });

      if (!resp.error) {
        await setAllInvitedUsers(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    await setIsInvitedUsersLoading();
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Function to handle the save action
  const runOnSave = async () => {
    // To get Unique array
    const uniqueArray = permissions.map((permission) => {
      const category = Object.keys(permission)[0];
      const actions = permission[category];

      return { category, actions };
    });

    setShowOverlay(true);

    if (invitedUserType.toUpperCase() === "ADD") {
      if (
        uniqueArray.length < 1 ||
        !email.includes(".", "@") ||
        userName.length < 2
      ) {
        // Validation errors
        setSnackbarMessage(
          uniqueArray.length < 1
            ? "Please select at least 1 permission"
            : userName.length < 2
            ? "User name must be at least 2 characters"
            : "Invalid email"
        );
        setSnackbarType("error");
        setShowSnackbar(true);
      } else {
        /* Add the user permissions via an API call */
        const requestBody = {
          email: email,
          username: userName,
          roles: {
            permissions: uniqueArray,
          },
          inviterID: getCookie("uid"),
        };
        const requestHeader = {
          "X-API-Key": API_KEY,
        };
        try {
          const resp = await axios.post(inviteUrl, requestBody, {
            headers: requestHeader,
          });
          console.log(resp);
          if (!resp.error) {
            // Success message
            setSnackbarMessage("Invite Sent!!");
            setSnackbarType("success");
            await getUsers();
          } else {
            // Error message
            setSnackbarMessage("Oops!! Error");
            setSnackbarType("error");
          }
        } catch (error) {
          // Error message in case of API failure
          setSnackbarMessage("Oops!! Error");
          setSnackbarType("error");
        } finally {
          // Hide the overlay and close the modal
          setShowSnackbar(true);
        }
      }
      setShowOverlay(false);
    } else {
      if (uniqueArray.length < 1) {
        // Validation errors
        setSnackbarMessage("Please select at least 1 permission");
        setSnackbarType("error");
        setShowSnackbar(true);
      } else {
        const requestBody = {
          email: email,
          username: userName,
          type: 1,
          profile: {
            roles: {
              permissions: uniqueArray,
            },
          },
        };
        const requestHeader = {
          "X-API-Key": API_KEY,
        };
        try {
          const resp = await axios.post(updatePermissionsUrl, requestBody, {
            headers: requestHeader,
          });
          if (!resp.error) {
            // Success message
            setShowSnackbar(true);
            setSnackbarMessage(resp.data.message);
            setSnackbarType("success");
            await getUsers();
          }
        } catch (error) {
          console.log(error);
          setShowSnackbar(true);
          // Error message in case of API failure
          setSnackbarMessage("Oops!! Error");
          setSnackbarType("error");
        } finally {
          // Hide the overlay and close the modal
        }
      }
    }
    await handleModalClose();
  };

  const handleModalClose = async () => {
    await setShowOverlay(false);
    await setEmail("");
    await setUserName("");
    await setPermissions([]);
    await setIsInvitedUserModalOpen();
  };

  return (
    <>
      {/* Modal for inviting/editing users */}
      <Modal open={isInvitedUserModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: "auto",
              right: "auto",
              minWidth: "50vw",
              maxWidth: "100vw",
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(1, 2),
              zIndex: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottom: `1px solid ${theme.palette.grey[400]}`,
            }}
          >
            <Typography variant="h6">
              {invitedUserType} User Permission
            </Typography>

            {/* Close button for the modal */}
            <IconButton
              aria-label="close"
              onClick={() => {
                handleModalClose();
              }}
              sx={{
                position: "absolute",
                right: 10,
                top: 5,
                color: (theme) => theme.palette.grey[500],
                display: "flex",
                alignSelf: "center",
              }}
            >
              <MdClose />
            </IconButton>
          </Box>

          <Box sx={FullScreenModalContent}>
            {/* Component for entering user details, specifically the email */}
            {invitedUserType !== "Edit" ? (
              <UserDetails
                email={email}
                setEmail={setEmail}
                userName={userName}
                setUserName={setUserName}
              />
            ) : null}

            {/* Component for selecting user permissions */}
            <PermissionList
              permissions={permissions}
              setPermissions={setPermissions}
            />
            <Box mt={4}>
              {/* Component with save and cancel buttons */}
              <SaveCancelButtons
                isModalOpen={isInvitedUserModalOpen}
                setIsModalOpen={setIsInvitedUserModalOpen}
                runOnSave={() => runOnSave()}
              />
              <Overlay showOverlay={showOverlay} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default InviteEditUser;
