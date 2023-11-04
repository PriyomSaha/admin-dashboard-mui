import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

function Sound() {
  return (
    <>
      <Typography variant="h6">Select Tone</Typography>
      <Typography>
        This tone will play when you receive a new order on your order
        management panel
      </Typography>
      <Box mt={2}>
        {/* Language Selection Dropdown */}
        <FormControl variant="outlined" size="small" sx={{ width: "200px" }}>
          <InputLabel>Select Language</InputLabel>
          <Select
            label="Select Language"
            // value={language}
            // onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
            <MenuItem value="french">French</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default Sound;
