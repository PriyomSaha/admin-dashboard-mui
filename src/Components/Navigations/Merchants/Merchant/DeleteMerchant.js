import React, { useState } from "react";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { MdClose, MdDelete } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { ModalStyle } from "Components/Assets/GlobalStyles";
import { theme } from "Components/UI/themes";

const DeleteMerchant = ({ merchantName }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  return (
    <>
      <MdDelete
        onClick={() => setIsDeleteModalOpen(true)}
        style={{ fontSize: "25px", cursor: "pointer" }}
      />

      <Modal open={isDeleteModalOpen}>
        <Box sx={ModalStyle}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TiWarning />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              &nbsp;Delete Merchant
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <MdClose />
          </IconButton>

          <hr />

          <Typography id="modal-modal-description" sx={{ py: 3 }}>
            Are you sure you want to delete Merchant
            <br />" <b>{merchantName}</b> "
          </Typography>

          <hr />

          <Button
            variant="contained"
            sx={{
              float: "right",
              position: "relative",
            }}
            color="error"
            onClick={() => {
              setIsDeleteModalOpen(!isDeleteModalOpen);
            }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            sx={{
              float: "left",
              position: "relative",
              background: `${theme.palette.grey[600]}`,
              "&:hover": {
                background: `${theme.palette.grey[700]}`,
              },
            }}
            onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteMerchant;
