import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import { theme } from "Components/UI/themes";

const CompactChipInputTextField = ({ label, chips, setChips }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    // Remove the selected chip
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
  };
  const chipContainer = {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "100vw", // Set your desired maximum width here
    marginTop: theme.spacing(1),
  };

  return (
    <Box>
      <TextField
        label={label}
        placeholder="Press enter to add"
        size="small"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <Box sx={chipContainer}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleDeleteChip(chip)}
            size="small"
            sx={{
              border: `1px solid ${theme.palette.grey[400]}`,
              m: 0.5,
              borderRadius: 1,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CompactChipInputTextField;
