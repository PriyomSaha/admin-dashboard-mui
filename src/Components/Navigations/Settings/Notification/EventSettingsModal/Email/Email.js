import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import EditorWrapper from "Components/Assets/ReusableComp/Editor/EditorWrapper";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { useEffect } from "react";

function Email({ emailDescription, setEmailDescription }) {
  const [email, setEmail] = useState("");
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
                <Button variant="contained">Add</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h6" color={theme.palette.grey[800]}>
          Description(Optional)
        </Typography>
      </Box>
      <EditorWrapper EMPTY_CONTENT={emailDescription} />
    </>
  );
}

export default Email;
