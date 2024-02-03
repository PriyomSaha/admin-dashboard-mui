import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ImageUpload from "Components/Assets/ReusableComp/EditImage/ImageUpload";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import { usePopupStore } from "Components/Assets/StateManagement";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import React from "react";
import { MdClose } from "react-icons/md";

function AddEditPopup() {
  // Access state and functions from the popup store using custom hooks
  const isPopupModalOpen = usePopupStore((state) => state.isPopupModalOpen);
  const setIsPopupModalOpen = usePopupStore(
    (state) => state.setIsPopupModalOpen
  );
  const popupType = usePopupStore((state) => state.popupType);

  return (
    <>
      {/* The modal dialog */}
      <Modal open={isPopupModalOpen} sx={FullScreenModalContainer}>
        <Box>
          {/* Modal header */}
          <Box sx={FullScreenModalHeader}>
            {/* Title of the modal */}
            <Typography variant="h6">{popupType} Popup</Typography>

            {/* Close button */}
            <IconButton
              aria-label="close"
              onClick={() => setIsPopupModalOpen()}
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
                  {/* Input field for the popup title */}
                  <TextField
                    fullWidth
                    label="Title*"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item>
                  {/* Select field for the popup status */}
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Status*</InputLabel>
                    <Select label="Status*">
                      <MenuItem value="merchant">Active</MenuItem>
                      <MenuItem value="admin">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  {/* Select field for the popup type */}
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Type*</InputLabel>
                    <Select label="Type*">
                      <MenuItem value="image">Image</MenuItem>
                      <MenuItem value="text">Text</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  {/* Select field for the popup action type */}
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Action Type</InputLabel>
                    <Select label="Action Type*">
                      <MenuItem value="none">None</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  {/* Select field for the popup action value */}
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
                <Grid item>
                  {/* Select field for the popup action type */}
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Location*</InputLabel>
                    <Select label="Location*">
                      <MenuItem value="global">Global</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Right side of the form */}
              <Grid item container xs={12} sm={6} direction={"column"}>
                <FormControl>
                  <RadioGroup
                  // value={discountType}
                  // onChange={(event) => {
                  //   setDiscountType(event.target.value);
                  // }}
                  >
                    <Grid item>
                      <Typography
                        color={theme.palette.grey[700]}
                        fontWeight={600}
                      >
                        Frequency*
                      </Typography>
                    </Grid>
                    <Grid container direction="row">
                      <Grid item>
                        <FormControlLabel
                          value="once"
                          control={<Radio />}
                          label="Once"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          value="always"
                          control={<Radio />}
                          label="Always"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
                <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {/* Component for image upload */}
                  <ImageUpload />
                </Grid>
              </Grid>
            </Grid>

            {/* Save and cancel buttons */}
            <Box mt={4}>
              <SaveCancelButtons
                isModalOpen={isPopupModalOpen}
                setIsModalOpen={setIsPopupModalOpen}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddEditPopup;
