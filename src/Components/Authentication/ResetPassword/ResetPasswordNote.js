import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { ModalStyle } from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import React from "react";
import { MdClose } from "react-icons/md";
import { TiWarning } from "react-icons/ti";

function ResetPasswordNote({ isNotesOpen, setIsNotesOpen }) {
  return (
    <>
      <Modal open={isNotesOpen}>
        <Box sx={ModalStyle}>
          {/* Modal header with warning icon and title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TiWarning />
            <Typography variant="h6" component="h2">
              &nbsp;Note : If we find the user
            </Typography>
          </Box>

          {/* Horizontal line for visual separation */}
          <hr />

          <Typography variant="body2" sx={{ py: 2 }}>
            <div style={{ whiteSpace: "wrap" }}>
              📧 We'll send you an email with a link to reset your password.
            </div>
            <br />
            <div style={{ whiteSpace: "wrap" }}>
              📱 Simultaneously, you'll receive a one-time password (OTP) on
              your mobile.
            </div>
            <br />
            <div style={{ whiteSpace: "wrap" }}>
              🔐 Just enter the OTP to update your password and secure your
              account!
            </div>
          </Typography>

          {/* Horizontal line for visual separation */}
          <hr />

          <Button
            variant="contained"
            sx={{
              float: "right",
              position: "relative",
            }}
            color="primary"
            onClick={() => {
              setIsNotesOpen(!isNotesOpen);
            }}
          >
            Okay
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ResetPasswordNote;
