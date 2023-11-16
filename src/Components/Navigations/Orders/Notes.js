import {
  Badge,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material"; // Importing required Material-UI components and styles
import { ModalStyle } from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes"; // Importing the theme for styling
import React, { useState, useEffect } from "react"; // Importing React and its hooks
import { BsFillClipboard2MinusFill } from "react-icons/bs"; // Importing an icon from react-icons library
import { MdClose } from "react-icons/md"; // Importing an icon from react-icons library

function Notes(props) {
  // State variables using React hooks
  const [open, setOpen] = useState(false); // State for controlling the modal visibility

  const [hasNotes, setHasNotes] = useState(); // State to track whether the order has notes or not

  const [notes, setNotes] = useState(props.notes); // State to store the current notes of the order
  const [updatedNotes, setUpdatedNotes] = useState(props.notes); // State to store the updated notes while editing

  useEffect(() => {
    // This useEffect hook is used to determine if the order has any notes or not
    if (notes.length !== 0) setHasNotes(true);
    else setHasNotes(false);
  }, [notes]);

  return (
    <>
      {/* Display the notes icon, clickable to open the modal */}
      <Box
        sx={{
          cursor: "pointer",
          padding: "0.4rem 0.6rem 0.6rem 0.8rem",
          background: theme.palette.grey[200],
          borderRadius: "5px",
        }}
        onClick={() => setOpen(!open)} // Toggles the visibility of the modal when the icon is clicked
      >
        {hasNotes ? (
          // Show a badge with a dot if there are notes for the order
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
          // Show the notes icon without a badge if there are no notes for the order
          <BsFillClipboard2MinusFill size={"1.2rem"} />
        )}
      </Box>

      {/* Modal component for adding or editing order notes */}
      <Modal open={open} TransitionComponent={Fade}>
        <Box sx={ModalStyle}>
          {/* Modal header */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Order Notes
          </Typography>

          {/* Close button */}
          <IconButton
            aria-label="close"
            onClick={() => setOpen(!open)} // Toggles the visibility of the modal when the close button is clicked
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <MdClose />
          </IconButton>

          {/* Horizontal line separator */}
          <hr />

          {/* Display the order ID */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Order id : {props.id}
          </Typography>

          {/* Text field for entering and editing notes */}
          <TextField
            sx={{ width: "100%", my: 2 }}
            placeholder="Write anything related to this order... "
            minRows={3}
            maxRows={5}
            multiline
            fullWidth
            value={updatedNotes} // Binds the state variable to the text field value
            onChange={(e) => {
              setUpdatedNotes(e.target.value); // Updates the state with the user's input
            }}
          />

          {/* Horizontal line separator */}
          <hr />

          {/* Save button */}
          <Button
            variant="contained"
            sx={{
              float: "right",
              position: "relative",
            }}
            onClick={() => {
              setOpen(!open); // Closes the modal
              setNotes(updatedNotes); // Updates the 'notes' state with the edited notes
            }}
          >
            Save
          </Button>

          {/* Close button */}
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
            onClick={() => setOpen(!open)} // Closes the modal when the 'Close' button is clicked
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Notes;

/* Comments Exp :
In summary, the "Notes" component allows users to view and edit notes related to a specific order. 
It utilizes Material-UI components, icons from the react-icons library, and React hooks to manage state and handle user interactions. 
The component renders a clickable icon displaying the number of notes for the order, and when clicked, it opens a modal where users can add or edit the notes. 
The modal contains a text field for entering and updating the notes, along with "Save" and "Close" buttons for saving the changes or canceling the editing process.*/
