import React, { useState, useRef } from "react";
import { Badge, Box, Button, Grid, Typography } from "@mui/material";
import AddImage from "Components/UI/Images/AddImage.svg";
import { MdClose } from "react-icons/md";

// Functional component 'ImageUpload' to handle image upload and display
const ImageUpload = () => {
  // State variable to store the image data in canvas format
  const [canvasImage, setCanvasImage] = useState(null);

  // Reference to the file input element to trigger file selection
  const inputRef = useRef(null);

  // Function to handle the image change when a file is selected or dropped
  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          // Calculate the desired width and height while maintaining the aspect ratio
          let newWidth = 200;
          let newHeight = 200;

          // Create a canvas element and draw the image on it
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, newWidth, newHeight);

          // Set the canvas image data as the source for the <img> tag
          setCanvasImage(canvas.toDataURL("image/jpeg"));
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle the dragover event and prevent default behavior
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle the dragenter event and prevent default behavior
  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  // Function to handle the drop event and prevent default behavior
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageChange(file);
  };

  // Function to handle the image click and trigger file selection
  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <Box>
      {/* Conditional rendering based on whether an image is uploaded or not */}
      {canvasImage ? (
        // Display the uploaded image inside a Badge component with a close icon
        <Badge
          onClick={() => setCanvasImage(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          size="large"
          badgeContent={
            <Box
              sx={{
                backgroundColor: "black",
                color: "white",
                width: 20,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
            >
              <MdClose />
            </Box>
          }
        >
          <img
            src={canvasImage}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "5px",
            }}
          />
        </Badge>
      ) : (
        // If no image is uploaded, show a drop zone with the option to add an image
        <Grid
          onClick={handleImageClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
          container
          width={200}
          height={200}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid var(--image-upload)",
            borderRadius: "5px",
          }}
        >
          <Grid item>
            {/* Display the 'AddImage' SVG icon */}
            <img src={AddImage} alt="" style={{ width: 100, height: 100 }} />
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            {/* Text indicating to drag and drop an image */}
            <Typography sx={{ color: "var(--image-upload)" }}>
              Drag and drop
            </Typography>
            <Typography sx={{ color: "var(--image-upload)" }}>Or</Typography>
            {/* Button to browse and select an image */}
            <Button sx={{ color: "var(--image-upload)" }}>
              <b>Browse</b>
            </Button>
          </Grid>
        </Grid>
      )}
      {/* Hidden input element to handle file selection */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e) => handleImageChange(e.target.files[0])}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ImageUpload;

/**
 * The code imports required modules and components from Material-UI, along with the 'AddImage' SVG and 'MdClose' icon from 'Components/UI/Images' and 'react-icons' libraries, respectively.

The functional component 'ImageUpload' is created to handle image uploading and display.

The state variable 'canvasImage' is used to store the uploaded image data in canvas format.

The 'inputRef' is created as a reference to the file input element, which allows triggering file selection programmatically.

The 'handleImageChange' function is used to process the selected image file and convert it to canvas format while maintaining the aspect ratio. It then sets the 'canvasImage' state with the canvas image data.

Event handlers are defined to handle drag and drop events for image uploading.

The 'handleImageClick' function is used to handle the click event on the image and trigger the file selection dialog.

Conditional rendering is used to display either the uploaded image inside a Badge with a close icon or a drop zone to add an image.

The 'Badge' component is used to wrap the uploaded image with a close icon, allowing the user to remove the image.

The 'Grid' components are used to create the drop zone for adding an image.

The 'Typography' component displays instructions for dragging and dropping an image.

The 'Button' component provides an alternative option to browse and select an image.

The hidden 'input' element is used to handle file selection from the user's device. When an image is selected or dropped, the 'handleImageChange' function is triggered to process the image.

The 'ImageUpload' component provides a user-friendly way to upload and display images in the application. It ensures that the image size is optimized while maintaining the aspect ratio and provides an option to remove the uploaded image. */
