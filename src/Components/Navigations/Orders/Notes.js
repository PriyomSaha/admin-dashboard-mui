import {
  Badge,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "Components/UI/themes";
import React, { useState, useEffect } from "react";
import { BsFillClipboard2MinusFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";

function Notes(props) {
  const [open, setOpen] = useState(false);

  const [hasNotes, setHasNotes] = useState();

  const [notes, setNotes] = useState(props.notes);
  const [updatedNotes, setUpdatedNotes] = useState(props.notes);

  useEffect(() => {
    if (notes.length !== 0) setHasNotes(true);
    else setHasNotes(false);
  }, [notes]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 50,
    p: 2,
    borderRadius: "10px",
    [theme.breakpoints.between(0, 400)]: {
      width: "100%",
    },
  };
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          padding: "0.4rem 0.6rem 0.6rem 0.8rem",
          background: theme.palette.grey[200],
          borderRadius: "5px",
        }}
        onClick={() => setOpen(!open)}
      >
        {hasNotes ? (
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            color="error"
            overlap="rectangular"
            variant="dot"
          >
            <BsFillClipboard2MinusFill size={"1.2rem"} />
          </Badge>
        ) : (
          <BsFillClipboard2MinusFill size={"1.2rem"} />
        )}
      </Box>

      <Modal open={open} TransitionComponent={Fade}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Order Notes
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(!open)}
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Order id : {props.id}
          </Typography>
          <TextField
            sx={{ width: "100%", my: 2 }}
            placeholder="Write anything related to this order... "
            minRows={3}
            maxRows={5}
            multiline
            fullWidth
            value={updatedNotes}
            onChange={(e) => {
              setUpdatedNotes(e.target.value);
            }}
          />
          <hr />
          <Button
            variant="contained"
            sx={{
              float: "right",
              position: "relative",
            }}
            onClick={() => {
              setOpen(!open);
              setNotes(updatedNotes);
            }}
          >
            Save
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
            onClick={() => setOpen(!open)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Notes;
