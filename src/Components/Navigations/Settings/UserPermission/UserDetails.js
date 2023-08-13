import { Grid, Typography } from "@mui/material";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";

function UserDetails() {
  const [email, setEmail] = useState("");

  return (
    <>
      <Typography variant="h6" fontWeight={600}>
        User
      </Typography>
      <Typography variant="h7" color={theme.palette.grey[700]}>
        Give user access to your store by sending them an invitation.
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={12} sm={6} mb={2}>
          <EmailInput email={email} setEmail={setEmail} />
        </Grid>
      </Grid>
    </>
  );
}

export default UserDetails;
