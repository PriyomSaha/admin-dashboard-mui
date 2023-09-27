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

const Delete = ({ name, type }) => {
  // State to track whether the delete modal is open or not
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      {/* Delete button icon */}
      <MdDelete
        // Click event handler to open the delete modal
        onClick={() => setIsDeleteModalOpen(true)}
        style={{ fontSize: "25px", cursor: "pointer" }}
      />

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteModalOpen}>
        <Box sx={ModalStyle}>
          {/* Modal header with warning icon and title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TiWarning />
            <Typography variant="h6" component="h2">
              &nbsp;Delete {type}
            </Typography>
          </Box>

          {/* Close button in the modal */}
          <IconButton
            aria-label="close"
            // Click event handler to close the delete modal
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

          {/* Horizontal line for visual separation */}
          <hr />

          {/* Message inside the delete modal */}
          <Typography sx={{ py: 3 }}>
            Are you sure you want to delete{" "}
            {/* Type to delete first letter lower case */}
            {type.charAt(0).toLowerCase() + type.slice(1)}
            <br />" <b>{name}</b> "
          </Typography>

          {/* Horizontal line for visual separation */}
          <hr />

          {/* Delete button inside the modal */}
          <Button
            variant="contained"
            sx={{
              float: "right",
              position: "relative",
            }}
            color="error"
            // Click event handler to confirm the deletion
            onClick={() => {
              setIsDeleteModalOpen(!isDeleteModalOpen);
              // Perform the actual deletion action here...
            }}
          >
            Delete
          </Button>

          {/* Cancel button inside the modal */}
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
            // Click event handler to close the delete modal without deleting
            onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Delete;
