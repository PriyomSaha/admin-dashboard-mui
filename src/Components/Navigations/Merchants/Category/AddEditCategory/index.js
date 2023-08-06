import {
  Box,
  FormControl,
  FormLabel,
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
} from "Components/Assets/GlobalStyles";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import SaveCancelButtons from "Components/Navigations/Merchants/SaveCancelButtons";
import ImageUpload from "Components/Assets/ImageUpload";

function AddEditCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FaRegEdit
        onClick={() => setIsModalOpen(true)}
        style={{ fontSize: "25px", cursor: "pointer" }}
      />
      <Modal open={isModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: "auto",
              right: "auto",
              minWidth: "10vw",
              maxWidth: "100vw",

              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(1, 2),
              zIndex: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottom: `1px solid ${theme.palette.grey[400]}`,
            }}
          >
            <Typography variant="h6">Edit Category</Typography>

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
            <Box>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={theme.breakpoints.down("sm") ? 3 : 1}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                  spacing={theme.breakpoints.down("sm") ? 2 : 1}
                  flexDirection="column"
                >
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Category Name*"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Sort Order*"
                      variant="outlined"
                      size="small"
                      type="number"
                      inputProps={{
                        min: "1",
                        max: "100",
                        step: 1, // The increment/decrement step for the input value
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Status</InputLabel>
                      <Select label="Status">
                        <MenuItem value="merchant">Active</MenuItem>
                        <MenuItem value="admin">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ImageUpload />
                </Grid>
              </Grid>
              <Box mt={4}>
                <SaveCancelButtons
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddEditCategory;

// <ImageUpload />
