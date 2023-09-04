import React, { forwardRef, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function SiteSettings({}, siteSettingsref) {
  const [language, setLanguage] = useState("english");
  return (
    <>
      <Grid ref={siteSettingsref} item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Site Settings
          </Typography>
          <Typography>This includes basic site settings</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          <Paper elevation={3}>
            <Box px={4} py={3}>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ float: "right", width: "200px" }}
              >
                <InputLabel>Select Language</InputLabel>
                <Select
                  label="Select Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="spanish">Spanish</MenuItem>
                  <MenuItem value="french">French</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Site Title"
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Site Tagline"
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(SiteSettings);
