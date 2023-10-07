import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

function CompactChipInputSelect({
  totalList,
  selectedItems,
  setSelectedItems,
  inputLabelText,
}) {
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getStyles = (selected, theme) => {
    return {
      backgroundColor:
        selectedItems.indexOf(selected) === -1 ? "white" : "#a5bfe3",
      fontWeight:
        selectedItems.indexOf(selected) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold,
    };
  };

  const theme = useTheme();
  const count = 2;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedItems(typeof value === "string" ? value.split(",") : value);
  };

  // Handler for removing a selected item when a chip is deleted
  const handleDelete = (itemToDelete) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item !== itemToDelete
    );
    setSelectedItems(newSelectedItems);
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }} size="small">
        <InputLabel id="demo-multiple-chip-label">{inputLabelText}</InputLabel>
        <Select
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label={`"${inputLabelText}"`} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, py: 0.5 }}>
              {selected.map((value, index) =>
                index < count ? (
                  <Chip size="small" key={value} label={value} />
                ) : null
              )}
              {selected.length > count
                ? `& ${selected.length - count} more`
                : null}
            </Box>
          )}
          MenuProps={MenuProps}
          size="small"
        >
          {totalList.map((item) => (
            <MenuItem key={item} value={item} style={getStyles(item, theme)}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default CompactChipInputSelect;
