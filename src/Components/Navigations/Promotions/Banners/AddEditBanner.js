import {
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
} from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import React from "react";
import { MdClose } from "react-icons/md";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import ImageUpload from "Components/Assets/ReusableComp/ImageUpload";
import { useBannerStore } from "Components/Assets/StateManagement";

function AddEditBanner() {
  // Access state and functions from the banner store using custom hooks
  const isBannerModalOpen = useBannerStore((state) => state.isBannerModalOpen);
  const setIsBannerModalOpen = useBannerStore(
    (state) => state.setIsBannerModalOpen
  );
  const bannerType = useBannerStore((state) => state.bannerType);

  return (
    <>
      {/* The modal dialog */}
      <Modal open={isBannerModalOpen} sx={FullScreenModalContainer}>
        <Box>
          {/* Modal header */}
          <Box sx={FullScreenModalHeader}>
            {/* Title of the modal */}
            <Typography variant="h6">{bannerType} Banner</Typography>

            {/* Close button */}
            <IconButton
              aria-label="close"
              onClick={() => setIsBannerModalOpen()}
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

          {/* Modal content */}
          <Box sx={FullScreenModalContent}>
            <Box>
              {/* Grid layout for arranging form elements */}
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={theme.breakpoints.down("sm") ? 3 : 1}
              >
                {/* Left side of the form */}
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
                    {/* Input field for the banner name */}
                    <TextField
                      fullWidth
                      label="Title*"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    {/* Input field for the sort order */}
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
                    {/* Select field for the banner status */}
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Status</InputLabel>
                      <Select label="Status*">
                        <MenuItem value="merchant">Active</MenuItem>
                        <MenuItem value="admin">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    {/* Select field for the banner action type */}
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Action Type</InputLabel>
                      <Select label="Action Type*">
                        <MenuItem value="merchant_category">
                          Merchant Category
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    {/* Select field for the banner action value */}
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Action Value</InputLabel>
                      <Select label="Action Value*">
                        <MenuItem value="Sea Food & Meat">
                          Sea Food & Meat
                        </MenuItem>
                        <MenuItem value="Groceries & Dairy">
                          Groceries & Dairy
                        </MenuItem>
                        <MenuItem value="Healthy Organics">
                          Healthy Organics
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Right side of the form */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {/* Component for image upload */}
                  <ImageUpload imageUrl="https://th.bing.com/th?id=ORMS.78faa78b77b5990e06f3be6dc478ea5d&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.375&p=0" />
                </Grid>
              </Grid>

              {/* Save and cancel buttons */}
              <Box mt={4}>
                <SaveCancelButtons
                  isModalOpen={isBannerModalOpen}
                  setIsModalOpen={setIsBannerModalOpen}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddEditBanner;
