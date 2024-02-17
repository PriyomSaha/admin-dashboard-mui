import React, { useState, useRef, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Modal,
  Slider,
  Typography,
  Grid,
} from "@mui/material";
import AddImage from "Components/UI/Images/AddImage.svg";
import { getCroppedImg, getRotatedImage, readFile } from "./canvasUtils";
import { getOrientation } from "get-orientation/browser";
import { MdClose } from "react-icons/md";
import Cropper from "react-easy-crop";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
  cropContainer,
  controls,
  slider,
  sliderContainer,
  sliderLabel,
} from "Components/UI/GlobalStyles";
import SaveCancelButtons from "../SaveCancelButtons";

// Functional component 'ImageUpload' to handle image upload and display
const ImageUpload = ({ image, setImage }) => {
  // State variables
  const [canvasImage, setCanvasImage] = useState(image);
  const [imageSrc, setImageSrc] = useState(image);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Reference to the file input element to trigger file selection
  const inputRef = useRef(null);

  // useEffect to update canvasImage when imageUrl changes
  useEffect(() => {
    if (imageSrc) {
      setCanvasImage(imageSrc);
      setIsModalOpen(true);
    }
  }, [imageSrc]);

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
    onFileChange(file);
  };

  // Function to handle the image click and trigger file selection
  const handleImageClick = () => {
    inputRef.current.click();
  };

  // Constants
  const ORIENTATION_TO_ANGLE = {
    3: 180,
    6: 90,
    8: -90,
  };

  // Function to handle cropping completion
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Function to show the cropped image
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      await setCanvasImage(croppedImage);
      await setIsModalOpen(!isModalOpen);
      console.log(image);
      await setImage(croppedImage.split(",")[1]);
    } catch (e) {
      console.error(e);
    }
  };

  // Function to close the modal
  const onClose = () => {
    setCanvasImage(null);
    setImageSrc(null);
  };

  // Function to handle file change
  const onFileChange = async (file) => {
    let imageDataUrl = await readFile(file);

    try {
      // Apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }
    } catch (e) {
      console.warn("Failed to detect the orientation");
    }

    setImageSrc(imageDataUrl);
  };

  return (
    <Box>
      {imageSrc ? (
        <>
          {/* Display the uploaded image inside a Badge component with a close icon */}
          <Badge
            onClick={() => onClose()}
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
                maxWidth: "200px",
                maxHeight: "200px",
                borderRadius: "5px",
                border: "1px solid var(--image-upload)",
              }}
            />
          </Badge>

          {/* Modal for image cropping */}
          <Modal open={isModalOpen} sx={FullScreenModalContainer}>
            <Box>
              <Box sx={FullScreenModalHeader}>
                <Typography variant="h6">Crop Your image</Typography>
              </Box>

              <Box sx={FullScreenModalContent}>
                <Box sx={cropContainer}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </Box>
                <Box sx={controls}>
                  <Box sx={sliderContainer}>
                    <Typography variant="overline" sx={sliderLabel}>
                      Zoom
                    </Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      sx={slider}
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </Box>
                  <Box sx={sliderContainer}>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      sx={slider}
                      onChange={(e, rotation) => setRotation(rotation)}
                    />
                    <Typography variant="overline" sx={sliderLabel}>
                      Twist
                    </Typography>
                  </Box>
                </Box>

                {/* Save and Cancel buttons */}
                <SaveCancelButtons
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  runOnSave={showCroppedImage}
                />
              </Box>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          {/* If no image is uploaded, show a drop zone with the option to add an image */}
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
              <img
                src={AddImage}
                alt="Add New"
                style={{ width: 100, height: 100 }}
              />
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
        </>
      )}
      {/* Hidden input element to handle file selection */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e) => onFileChange(e.target.files[0])}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ImageUpload;
