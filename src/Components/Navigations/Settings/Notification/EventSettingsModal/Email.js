import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import EditorWrapper from "Components/Assets/ReusableComp/Editor/EditorWrapper";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { useEffect } from "react";
import ActionItemList from "./ActionItemList";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";

function Email({ emailDescription, setEmailDescription }) {
  // State to control whether the Snackbar is shown or hidden
  const [showSnackbar, setShowSnackbar] = useState(false);
  // State to store the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State to store the type of Snackbar, which can be 'success' or 'error'
  const [snackbarType, setSnackbarType] = useState(""); // 'success' or 'error'

  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);

  const addNewEmailToList = () => {
    if (email.length > 0) {
      if (!emailList.includes(email)) {
        setEmailList((prevList) => [...prevList, email]);
        setShowSnackbar(true);
        setSnackbarMessage("Email added");
        setSnackbarType("success");
      } else {
        setShowSnackbar(true);
        setSnackbarMessage("Email already added  ");
        setSnackbarType("error");
      }
    } else {
      setShowSnackbar(true);
      setSnackbarMessage("Email field cannot be blank");
      setSnackbarType("error");
    }
  };

  const deleteEmailFromList = (index) => {
    try {
      const updatedList = [...emailList];
      updatedList.splice(index, 1);
      setEmailList(updatedList);

      setShowSnackbar(true);
      setSnackbarMessage("Email deleted");
      setSnackbarType("success");
    } catch {
      setShowSnackbar(true);
      setSnackbarMessage("Some error occured in deleting..");
      setSnackbarType("error");
    }
  };

  return (
    <>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" color={theme.palette.grey[800]}>
              Enter recipients
            </Typography>
            <Typography variant="body2" color={theme.palette.grey[600]} mb={3}>
              Input Mobile Numbers
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                {/* Email Input */}
                <EmailInput email={email} setEmail={setEmail} />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="contained" onClick={addNewEmailToList}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <ActionItemList
            actionItemsList={emailList}
            deleteItemFromList={deleteEmailFromList}
            recordType="Email"
          />
        </Paper>
      </Box>
      <Box>
        <Typography variant="h6" color={theme.palette.grey[800]}>
          Description(Optional)
        </Typography>
      </Box>
      <EditorWrapper EMPTY_CONTENT={emailDescription} />
      <ToastAlert
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}

export default Email;
