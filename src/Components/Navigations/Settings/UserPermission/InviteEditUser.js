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
} from "Components/Assets/GlobalStyles";
import { theme } from "Components/UI/themes";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import PermissionList from "./PermissionList";
import UserDetails from "./UserDetails";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import axios from "axios";
import Overlay from "Components/Assets/ReusableComp/Overlay";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";

function InviteEditUser({ type }) {
  // State to control the visibility of the modal, selected permissions, and email input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [perms, setPerms] = useState([]); // Array to hold selected permissions
  const [email, setEmail] = useState(""); // State to store the email input value
  const [showOverlay, setShowOverlay] = useState(false); // While sending invite

  // State to control whether the Snackbar is shown or hidden
  const [showSnackbar, setShowSnackbar] = useState(false);
  // State to store the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State to store the type of Snackbar, which can be 'success' or 'error'
  const [snackbarType, setSnackbarType] = useState("success"); // 'success' or 'error'

  //To set email to blank
  useEffect(() => {
    setEmail("");
  }, [isModalOpen]);

  // Function to handle the save action
  const runOnSave = async (e) => {
    // Use a Set to ensure unique permissions
    const uniqueElements = new Set(perms);
    const uniqueArray = [...uniqueElements];

    // Show overlay while processing
    setShowOverlay(true);

    if (uniqueArray.length < 1 || !email.includes(".", "@")) {
      // Validation errors
      setSnackbarMessage(
        uniqueArray.length < 1
          ? "Please select at least 1 permission"
          : "Invalid email"
      );
      setSnackbarType("error");
      setShowSnackbar(true);
      setShowOverlay(false);
    } else {
      // Update the user permissions via an API call
      const inviteUrl = `${process.env.REACT_APP_INVITE_USER_URL}${email}`; // Endpoint for user invitation
      try {
        const resp = await axios.post(inviteUrl, {
          email: email,
          permissions: uniqueArray,
        });

        if (resp.status === 200) {
          // Success message
          setSnackbarMessage("Invite Sent!!");
          setSnackbarType("success");
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
        setShowOverlay(false);
        setIsModalOpen(false);
        setShowSnackbar(true);
      }
    }
  };

  return (
    <>
      {type === "Edit" ? (
        <FaRegEdit
          onClick={() => setIsModalOpen(true)}
          style={{ fontSize: "25px", cursor: "pointer" }}
        />
      ) : (
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="contained-dark"
          sx={{
            ":hover": {
              background: theme.palette.grey[800],
            },
          }}
        >
          Invite User
        </Button>
      )}

      {/* Modal for inviting/editing users */}
      <Modal open={isModalOpen} sx={FullScreenModalContainer}>
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
            <Typography variant="h6">{type} User Permission</Typography>

            {/* Close button for the modal */}
            <IconButton
              aria-label="close"
              onClick={() => setIsModalOpen(!isModalOpen)}
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
            <UserDetails email={email} setEmail={setEmail} />

            {/* Component for selecting user permissions */}
            <PermissionList perms={perms} setPerms={setPerms} />

            <Box mt={4}>
              {/* Component with save and cancel buttons */}
              <SaveCancelButtons
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                runOnSave={runOnSave}
              />
              <Overlay showOverlay={showOverlay} />
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Display error or success message in a Snackbar */}
      <ToastAlert
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}

export default InviteEditUser;
