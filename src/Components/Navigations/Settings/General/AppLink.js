import React, { forwardRef, useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";

function AppLink({}, ref) {
  // State variables to manage selected store and links
  const [selected, setSelected] = useState("Playstore"); // Default to Playstore
  const [playstoreLink, setPlaystoreLink] = useState(""); // State for Playstore link
  const [appstoreLink, setAppstoreLink] = useState(""); // State for Appstore link

  return (
    <>
      {/* Grid item for displaying the title and description */}
      <Grid ref={ref} item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Mobile App Links
          </Typography>
          {/* Description */}
          <Typography>
            Playstore and Appstore links of your Mobile application
          </Typography>
        </Box>
      </Grid>
      {/* Grid item for displaying buttons and input */}
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          <Box mb={2}>
            {/* Button to select Playstore */}
            <Button
              onClick={() => setSelected("Playstore")} // Set selected to Playstore
              variant={
                selected === "Playstore" ? "contained-dark" : "outlined-dark"
              } // Change button style based on selection
              sx={
                selected === "Playstore"
                  ? {
                      ":hover": {
                        background: theme.palette.grey[800],
                      },
                    }
                  : null
              }
            >
              Playstore
            </Button>
            {/* Button to select Appstore */}
            <Button
              onClick={() => setSelected("Appstore")} // Set selected to Appstore
              variant={
                selected === "Appstore" ? "contained-dark" : "outlined-dark"
              } // Change button style based on selection
              sx={
                selected === "Appstore"
                  ? {
                      ":hover": {
                        background: theme.palette.grey[800],
                      },
                    }
                  : null
              }
            >
              Appstore
            </Button>
          </Box>
          {/* Paper component for the input field */}
          <Paper elevation={3}>
            <Box px={4} py={3}>
              {selected === "Playstore" ? ( // Conditional rendering based on selection
                // Input field for Playstore link
                <TextField
                  fullWidth
                  label="Playstore Link"
                  variant="outlined"
                  size="small"
                  value={playstoreLink} // Set value to state variable
                  onChange={(e) => setPlaystoreLink(e.target.value)} // Update state on input change
                />
              ) : (
                // Input field for Appstore link
                <TextField
                  fullWidth
                  label="Appstore Link"
                  variant="outlined"
                  size="small"
                  value={appstoreLink} // Set value to state variable
                  onChange={(e) => setAppstoreLink(e.target.value)} // Update state on input change
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(AppLink);
