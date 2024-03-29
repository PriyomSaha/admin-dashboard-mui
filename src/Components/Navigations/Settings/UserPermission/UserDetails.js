import { Grid, TextField, Typography } from "@mui/material";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import { theme } from "Components/UI/themes";
import React from "react";

function UserDetails({ email, setEmail, userName, setUserName }) {
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} mt={2}>
          {/* Component for entering the user's email */}
          <EmailInput email={email} setEmail={setEmail} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Enter receipient's name"
            value={userName}
            onChange={(e) => {
              // Remove special characters and spaces from the input
              const sanitizedInput = e.target.value.replace(
                /[^a-zA-Z0-9]/g,
                ""
              );

              // Limit the length to a maximum of 10 characters
              const truncatedInput = sanitizedInput.slice(0, 20);

              // Update the state only if the truncated input is different from the current value
              if (truncatedInput !== userName) {
                setUserName(truncatedInput);
              }
            }}
            // helperText="No special characters or spaces are allowed."
          />
          <Typography
            variant="caption"
            color={theme.palette.grey[600]}
            style={{ display: "inline-block" }}
          >
            No special characters or spaces are allowed.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default UserDetails;
