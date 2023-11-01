import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

function LanguageTemplateChannelSoundSettings() {
  // State variable to manage the selected language
  const [language, setLanguage] = useState("english");

  const [selected, setSelected] = useState("Template");

  return (
    <>
      <Box mt={2}>
        {/* Language Selection Dropdown */}
        <FormControl variant="outlined" size="small" sx={{ width: "200px" }}>
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
      </Box>
      <Box mt={2} mb={3}>
        <Button
          onClick={() => setSelected("Template")}
          variant={selected === "Template" ? "contained-dark" : "outlined-dark"}
        >
          Template
        </Button>
        <Button
          onClick={() => setSelected("Channel")}
          variant={selected === "Channel" ? "contained-dark" : "outlined-dark"}
        >
          Channel
        </Button>
        <Button
          onClick={() => setSelected("Sound")}
          variant={selected === "Sound" ? "contained-dark" : "outlined-dark"}
        >
          Sound
        </Button>
      </Box>
    </>
  );
}

export default LanguageTemplateChannelSoundSettings;
