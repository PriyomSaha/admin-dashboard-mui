import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FaPlay } from "react-icons/fa6";
import { getNotificationSound } from "Components/Assets/ReusableComp/SoundNotification";

function Sound() {
  const [sound, setSound] = useState("1");
  return (
    <>
      <Typography variant="h6">Select Tone</Typography>
      <Typography>
        This tone will play when you receive a new order on your order
        management panel
      </Typography>
      <Grid container mt={1} spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Language Selection Dropdown */}
          <FormControl variant="outlined" size="small" sx={{ width: "100%" }}>
            <InputLabel>Select Notification Sound</InputLabel>
            <Select
              label="Select Notification Sound"
              value={sound}
              onChange={(e) => setSound(e.target.value)}
            >
              <MenuItem value="1">Default</MenuItem>
              <MenuItem value="2">Archive</MenuItem>
              <MenuItem value="3">Click</MenuItem>
              <MenuItem value="4">Bell</MenuItem>
              <MenuItem value="5">SciFi Click</MenuItem>
              <MenuItem value="6">Bubble</MenuItem>
              <MenuItem value="7">Software</MenuItem>
              <MenuItem value="8">Popup</MenuItem>
              <MenuItem value="9">SciFi Confirmation</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--primary-button)",
              color: "var(--header-nav-text)",
            }}
            startIcon={<FaPlay />}
            onClick={() => getNotificationSound(sound).play()}
          >
            Play
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained">Save</Button>
      </Box>
    </>
  );
}

export default Sound;
