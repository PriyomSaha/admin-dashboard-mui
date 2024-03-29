import React, { useEffect, useState } from "react";
import {
  useAccountStore,
  useEditProfileStore,
  useSnackbarStore,
} from "Components/Assets/StateManagement";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
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
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import { MdClose } from "react-icons/md";
import PasswordInput from "Components/Assets/ReusableComp/PasswordInput";
import { PiPasswordDuotone, PiPasswordFill } from "react-icons/pi";
import axios from "axios";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";
import { getCookie, setCookie } from "Components/Assets/UIServices";
import { useNavigate } from "react-router-dom";

function Edit() {
  const isEditProfile = useEditProfileStore((state) => state.isEditProfile);
  const setIsEditProfile = useEditProfileStore(
    (state) => state.setIsEditProfile
  );
  const userData = useAccountStore((state) => state.userData);

  const setUserData = useAccountStore((state) => state.setUserData);

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [userName, setUserName] = useState(userData.userName);

  const [newpassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, setChangePassword] = useState(false);

  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [isPassMatch, setIsPassMatch] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accessing alert snackbar data from global state
  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);

  // API endpoint for edit Profile
  const editProfileURL =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_EDIT_PROFILE;

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setIsPassMatch(true);
  }, [newpassword, confirmNewpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newpassword !== confirmNewpassword) {
      setIsPassMatch(false);
      setIsSubmitting(false); // Set it to false here
    } else if (confirmPassword.length <= 0) {
      setShowSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Please confirm your Password!");
    } else {
      setIsSubmitting(true);
      try {
        // Call registration API with user data
        const requestBody = {
          // country: country,
          firstName: firstName,
          lastName: lastName,
          username: userName,
          password: confirmPassword,
          newPassword: newpassword,
          email: email,
          // phone: phoneNumber,
        };
        const requestHeader = {
          "X-API-Key": API_KEY,
        };
        const resp = await axios.post(editProfileURL, requestBody, {
          headers: requestHeader,
        });
        await setShowSnackbar(true);
        await setSnackbarType("success");
        await setSnackbarMessage(resp.data.message);

        setCookie("username", userName, 7);
        setCookie("firstName", firstName, 7);
        setCookie("lastName", lastName, 7);
        setUserData(
          userName,
          firstName,
          lastName,
          email,
          getCookie("permissions"),
          getCookie("role"),
          true
        );

        await setTimeout(() => {
          setIsEditProfile(!isEditProfile);
        }, 2000); // Adjust the delay time as needed
        // await window.location.reload();
      } catch (error) {
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Profile not updated!");
      }
    }
    setIsSubmitting(false); // Set it to false here
  };

  return (
    <>
      <Modal open={isEditProfile} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
                  marginTop: "15px",
                }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  sx={{
                    "& .MuiInputBase-root.Mui-disabled": {
                      background: theme.palette.grey[300],
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="User Name"
                  variant="outlined"
                  size="small"
                  sx={{
                    marginTop: matches ? "5px" : "15px",
                  }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} display="flex" justifyContent="start">
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ mt: 2 }}
                  control={
                    <Checkbox
                      value={changePassword}
                      onChange={() => setChangePassword(!changePassword)}
                    />
                  }
                  label="Want to change Password ?"
                />
              </Grid>
            </Grid>
            {changePassword ? (
              <Grid
                container
                spacing={2}
                display="flex"
                justifyContent="center"
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    marginTop: "-10px",
                  }}
                >
                  <PasswordInput
                    password={newpassword}
                    setPassword={setNewPassword}
                    label="New Password"
                    needStrengthValidation={true}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    marginTop: matches ? "-20px" : "-10px",
                  }}
                >
                  <PasswordInput
                    password={confirmNewpassword}
                    setPassword={setConfirmNewPassword}
                    label="Reenter New Password"
                    needStrengthValidation={true}
                  />
                  {isPassMatch ? null : (
                    <Typography color={"error"}>
                      Passwords Not Matching
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ) : null}

            <Typography variant="caption" fontWeight={600}>
              Please confirm the current password to continue
            </Typography>
            <Grid container spacing={2} display="flex" justifyContent="start">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  marginTop: "-10px",
                }}
              >
                <PasswordInput
                  password={confirmPassword}
                  setPassword={setConfirmPassword}
                  label="Current Password "
                  needStrengthValidation={false}
                />
              </Grid>
            </Grid>
            {/* button */}
            <Box mt={4}>
              <>
                {/* Horizontal line for visual separation */}
                <hr />
                {/* Container for the Update buttons */}
                <Box>
                  {isSubmitting ? (
                    // Display progress indicator while submitting
                    <Button
                      disabled
                      variant="contained"
                      sx={{
                        float: "right",
                        position: "relative",
                      }}
                    >
                      Updating...
                      <CircularProgress
                        size={20}
                        sx={{
                          color: "var(--header-nav-text)",
                          ml: 2,
                        }}
                      />
                    </Button>
                  ) : (
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
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Update&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;
                    </Button>
                  )}
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
