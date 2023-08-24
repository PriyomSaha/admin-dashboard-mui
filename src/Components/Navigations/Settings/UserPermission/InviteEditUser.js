import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
} from "Components/Assets/GlobalStyles";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import PermissionList from "./PermissionList";
import UserDetails from "./UserDetails";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import axios from "axios";

function InviteEditUser({ type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [perms, setPerms] = useState([]);
  const [email, setEmail] = useState("");

  const runOnSave = async (e) => {
    const uniqueElements = await new Set(perms);
    const uniqueArray = [...uniqueElements];
    await alert(uniqueArray);

    // Update
    const url = `/api/v1/invite?username=${email}`; //endPoint
    // await e.preventDefault();
    try {
      const resp = await axios.post(url, {
        email: email,
        permissions: uniqueArray,
      });
      await console.log(resp);
    } catch (error) {
      await console.log(error);
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
            <UserDetails email={email} setEmail={setEmail} />
            <PermissionList perms={perms} setPerms={setPerms} />
            <Box mt={4}>
              <SaveCancelButtons
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                runOnSave={runOnSave}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default InviteEditUser;
