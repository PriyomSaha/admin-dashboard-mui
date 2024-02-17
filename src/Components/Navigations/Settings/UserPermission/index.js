import React, { useState } from "react";
import UserTable from "./UserTable";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MdClear, MdSearch } from "react-icons/md";
import InviteEditUser from "./InviteEditUser";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";
import { useInvitedUserStore } from "Components/Assets/StateManagement";
import { theme } from "Components/UI/themes";

function UserPermisson() {
  // State to control whether the Snackbar is shown or hidden
  const [showSnackbar, setShowSnackbar] = useState(false);
  // State to store the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State to store the type of Snackbar, which can be 'success' or 'error'
  const [snackbarType, setSnackbarType] = useState("success"); // 'success' or 'error'

  const [email, setEmail] = useState(""); // State to store the email input value
  const [userName, setUserName] = useState(""); // State State to store the user name for email
  const [permissions, setPermissions] = useState([]);

  const setIsInvitedUserModalOpen = useInvitedUserStore(
    (state) => state.setIsInvitedUserModalOpen
  );
  const setInvitedUserType = useInvitedUserStore(
    (state) => state.setInvitedUserType
  );

  // Media query to check if the screen size matches 'sm' breakpoint or higher
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  // State to manage the search text
  const [searchText, setSearchText] = useState("");

  // Event handler for updating the search text as the user types
  const handleSearchChange = (event) => {
    // When the user types in the input, update the searchText state with the current value
    setSearchText(event.target.value);
  };

  // Event handler to clear the search text when the cross button is clicked
  const handleClearSearch = () => {
    // When the cross button is clicked, set the searchText state to an empty string to clear the search
    setSearchText("");
  };
  return (
    <Box width={"100%"}>
      <Stack
        spacing={2}
        direction={matches ? "row" : "column"}
        justifyContent="space-between"
        sx={{ flexWrap: "wrap" }}
        alignItems="center"
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Users
          </Typography>
          <Typography>List of all users getting access to the panel</Typography>
        </Box>

        <Box>
          {/* TextField to input search criteria for filtering users */}
          <TextField
            size="small"
            placeholder="Search users ..."
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              // Adding the search icon to the start of the input
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch />
                </InputAdornment>
              ),
              // Adding the clear button to the end of the input (only when there's text)
              endAdornment: (
                <InputAdornment position="end">
                  {searchText && ( // Render the clear button only if there's text in the input
                    <IconButton edge="end" onClick={handleClearSearch}>
                      <MdClear />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>
        <Box>
          {/* Passing the type based on that componet will be rendered */}
          <Button
            onClick={() => {
              setIsInvitedUserModalOpen();
              setInvitedUserType("Add");
            }}
            variant="contained-dark"
            sx={{
              ":hover": {
                background: theme.palette.grey[800],
              },
            }}
          >
            Invite User
          </Button>
        </Box>
      </Stack>

      <InviteEditUser
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
        snackbarType={snackbarType}
        setSnackbarType={setSnackbarType}
        email={email}
        setEmail={setEmail}
        userName={userName}
        setUserName={setUserName}
        permissions={permissions}
        setPermissions={setPermissions}
      />
      <UserTable
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
        snackbarType={snackbarType}
        setSnackbarType={setSnackbarType}
        email={email}
        setEmail={setEmail}
        userName={userName}
        setUserName={setUserName}
        permissions={permissions}
        setPermissions={setPermissions}
      />
      {/* Display error or success message in a Snackbar */}
      <ToastAlert
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </Box>
  );
}

export default UserPermisson;
