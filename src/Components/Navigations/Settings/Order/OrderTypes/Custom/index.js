import React, { useState } from "react";
import FormBuilder from "./FormBulder";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/Assets/GlobalStyles";
import { MdClose, MdExpandMore } from "react-icons/md";
import ImageUpload from "Components/Assets/ReusableComp/ImageUpload";

function CustomOrderTypeModal({ isModalOpen, setIsModalOpen }) {
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("english");

  const [openFormBuilder, setOpenFormBuilder] = useState(false);
  return (
    <>
      <Modal open={isModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
            <Typography variant="h6">Custom Order Type</Typography>

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
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography mb={2}>Select Language</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Select Language</InputLabel>
                  <Select
                    label="Select Language"
                    onChange={(e) => setLanguage(e.target.value)}
                    value={language}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ImageUpload />
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography> Name</Typography>
                <TextField
                  fullWidth
                  label="Enter Name"
                  placeholder="Enter Name"
                  variant="outlined"
                  size="small"
                  value={description} // Set value to state variable
                  onChange={(e) => setDescription(e.target.value)} // Update state on input change
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography mb={1}> Custom Form Heading</Typography>
                <TextField
                  fullWidth
                  label="Form Heading"
                  placeholder="Enter Form Heading"
                  variant="outlined"
                  size="small"
                  value={description} // Set value to state variable
                  onChange={(e) => setDescription(e.target.value)} // Update state on input change
                  sx={{ mt: 2 }}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                />
              </Grid>
            </Grid>

            <Accordion
              expanded={openFormBuilder}
              onChange={() => setOpenFormBuilder(!openFormBuilder)}
            >
              <AccordionSummary expandIcon={<MdExpandMore size={30} />}>
                <Typography variant="body1">Custom Form Builder</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormBuilder />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CustomOrderTypeModal;
