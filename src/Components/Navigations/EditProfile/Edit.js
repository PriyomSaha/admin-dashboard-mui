import React, { useEffect, useState } from "react";
import { useEditProfileStore } from "Components/Assets/StateManagement";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
} from "Components/Assets/GlobalStyles";
import { theme } from "Components/UI/themes";
import { MdClose } from "react-icons/md";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";

function Edit() {
  const isEditProfile = useEditProfileStore((state) => state.isEditProfile);
  const setIsEditProfile = useEditProfileStore(
    (state) => state.setIsEditProfile
  );
  const [password, setPassword] = useState("Iluvu@1234");
  const [confirmPassword, setConfirmPassword] = useState("");

  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(true);

  useEffect(() => {
    setIsPassMatch(true);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsPassMatch(false);
      setIsSubmitting(false); // Set it to false here
    } else {
      setIsSubmitting(true);
      // Simulate an asynchronous operation with a delay
      setTimeout(async () => {
        // Perform your actual asynchronous operations here
        // For example, API calls or other async tasks

        setIsSubmitting(false); // Stop the circular progress
      }, 2000); // Delay for 2 seconds (adjust as needed)
    }
  };

  return (
    <>
      <Modal open={isEditProfile} sx={FullScreenModalContainer}>
        <Box>
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: "auto",
              right: "auto",
              minWidth: "50vw",
              maxWidth: "100vw",

              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(1, 2),
              zIndex: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottom: `1px solid ${theme.palette.grey[400]}`,
            }}
          >
            <Typography variant="h6">Edit Profile</Typography>

            <IconButton
              aria-label="close"
              onClick={() => setIsEditProfile()}
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
            <Grid container spacing={2} display="flex" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} display="flex" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  disabled={true}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  marginTop: matches ? "-20px" : "0px",
                }}
              >
                <PasswordInput
                  password={confirmPassword}
                  setPassword={setConfirmPassword}
                  label="Confirm Password"
                />
                {isPassMatch ? null : (
                  <Typography color={"error"}>
                    Passwords Not Matching
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} display="flex" justifyContent="start">
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                alignSelf={"start"}
                sx={{
                  marginTop: "10px",
                }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                  value="priyom1499@gmail.com"
                  disabled
                  sx={{
                    "& .MuiInputBase-root.Mui-disabled": {
                      background: theme.palette.grey[300],
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box mt={4}>
              <>
                {/* Horizontal line for visual separation */}
                <hr />

                {/* Container for the Update buttons */}
                <Box>
                  {/* Save button */}
                  <Button
                    variant="contained"
                    sx={{
                      float: "right",
                      position: "relative",
                    }}
                    // Click event handler to handle the "Update" action
                    onClick={(e) => {
                      // setIsEditProfile();
                      handleSubmit(e);
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Edit;
