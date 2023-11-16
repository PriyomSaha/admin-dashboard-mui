import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ModalStyle } from "Components/UI/GlobalStyles";
import { Divider, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

function DynamicTextBox({ isModalOpen, setIsModalOpen }) {
  // https://linkedin.com
  // https://instagram.com
  // https://twitter.com
  // https://github.com
  // https://youtube.com
  // https://facebook.com

  // State to manage the dynamic creation of text boxes
  const [textFields, setTextFields] = useState([]); // Initial state with one text field

  // State to store custom label and value
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");

  // This is just dummy value
  // useEffect(() => {
  //   setCustomLabel("linkedin");
  //   setCustomValue("https://linkedin.com");
  //   handleSaveTextField();

  //   setCustomLabel("instagram");
  //   setCustomValue("https://instagram.com");
  //   handleSaveTextField();

  //   setCustomLabel("twitter");
  //   setCustomValue("https://twitter.com");
  //   handleSaveTextField();

  //   setCustomLabel("github");
  //   setCustomValue("https://github.com");
  //   handleSaveTextField();

  //   setCustomLabel("youtube");
  //   setCustomValue("https://youtube.com");
  //   handleSaveTextField();

  //   setCustomLabel("facebook");
  //   setCustomValue("https://facebook.com");
  //   handleSaveTextField();
  // }, []);

  useEffect(() => {
    // Clear the custom label and value inputs when add new link is clicked
    if (isModalOpen) {
      setCustomLabel("");
      setCustomValue("");
    }
  }, [isModalOpen]);

  // Function to handle saving the custom text field
  const handleSaveTextField = () => {
    // Create a copy of the current textFields array
    const updatedTextFields = [...textFields];
    // Add the custom value to the array
    // Create an object with label and value properties and push it to the updatedTextFields array
    updatedTextFields.push({
      // Capitalize the first letter of customLabel and set it as the label
      label: customLabel.charAt(0).toUpperCase() + customLabel.slice(1),

      // Create a value by adding "https://" to the beginning of customValue after removing any existing "https://"
      value:
        "https://" +
        customValue.replace(new RegExp("https://", "g"), "").toLowerCase(),
    });

    // Update the state with the new array of text fields
    setTextFields(updatedTextFields);

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      {textFields.length === 0 ? (
        <Typography>You have not added any Social Media Link</Typography>
      ) : (
        textFields.map((data, index) => (
          <Box key={index} mt={2}>
            <TextField
              size="small"
              fullWidth
              label={data.label}
              variant="outlined"
              value={data.value}
              onChange={(e) => {
                const updatedTextFields = [...textFields];
                updatedTextFields[index] = e.target.value;
                setTextFields(updatedTextFields);
              }}
              disabled
            />
          </Box>
        ))
      )}

      {/* Modal for adding custom label and value */}
      <Modal open={isModalOpen}>
        <Box sx={ModalStyle}>
          {/* Modal Title */}
          <Typography variant="h6" gutterBottom>
            Add Custom Link
          </Typography>
          {/* Close button in the modal */}
          <IconButton
            aria-label="close"
            // Click event handler to close the delete modal
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <MdClose />
          </IconButton>
          <Divider />
          {/* Textbox for custom label */}
          <TextField
            size="small"
            fullWidth
            label="Name"
            variant="outlined"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          {/* Textbox for custom value */}
          <TextField
            size="small"
            fullWidth
            label="URL"
            variant="outlined"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            required
          />
          {/* Button to save the custom label and value */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveTextField}
            sx={{ mt: 2, float: "right", position: "relative" }}
            // Check if either customLabel or customValue is empty before saving
            disabled={!customLabel || !customValue}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default DynamicTextBox;
