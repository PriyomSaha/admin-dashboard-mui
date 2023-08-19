import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { ModalStyle } from "Components/Assets/GlobalStyles";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

function Status({ oldStatus }) {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [status, setStatus] = useState(oldStatus);
  const [updatedstatus, setUdateStatus] = useState(oldStatus);

  return (
    <>
      {updatedstatus === "Active" ? (
        <Chip
          label="Active"
          sx={{
            background: "var(--super-admin-login-button-background)",
            color: "var(--super-admin-login-button-text)",
            border: "1px solid var(--super-admin-login-button-text)",
            cursor: "pointer",
            letterSpacing: 1,
          }}
          onClick={() => setIsStatusModalOpen(!isStatusModalOpen)}
        />
      ) : updatedstatus === "Pending" ? (
        <Box>
          <Typography variant="body1" fontWeight={500}>
            Pending
          </Typography>
          <span
            style={{
              cursor: "pointer",
              color: "var(--links)",
            }}
          >
            (Resend Invite)
          </span>
        </Box>
      ) : (
        <Chip
          label="InActive"
          sx={{
            border: `1px solid ${theme.palette.grey[900]}`,
            cursor: "pointer",
          }}
          onClick={() => setIsStatusModalOpen(!isStatusModalOpen)}
        />
      )}

      <Modal open={isStatusModalOpen}>
        <Box sx={ModalStyle}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="h2">
              &nbsp;Update Status
            </Typography>
          </Box>
          {/* Close button in the modal */}
          <IconButton
            aria-label="close"
            onClick={() => setIsStatusModalOpen(!isStatusModalOpen)}
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
          <FormControl sx={{ my: 4 }} fullWidth variant="outlined" size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="InActive">InActive</MenuItem>
            </Select>
          </FormControl>

          <SaveCancelButtons
            isModalOpen={isStatusModalOpen}
            setIsModalOpen={setIsStatusModalOpen}
            runOnSave={() => {
              setUdateStatus(status);
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Status;
