import { Grid, Typography } from "@mui/material";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { theme } from "Components/UI/themes";
import React from "react";

function UserDetails({ email, setEmail }) {
  return (
    <>
      {/* Title for the user details section */}
      <Typography variant="h6" fontWeight={600}>
        User
      </Typography>
      {/* Description for the user details section */}
      <Typography variant="h7" color={theme.palette.grey[700]}>
        Give user access to your store by sending them an invitation.
      </Typography>
      <br />
      {/* Grid container for organizing user input elements */}
      <Grid container>
        <Grid item xs={12} sm={6} mb={2}>
          {/* Component for entering the user's email */}
          <EmailInput email={email} setEmail={setEmail} />
        </Grid>
      </Grid>
    </>
  );
}

export default UserDetails;
