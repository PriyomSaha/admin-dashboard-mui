import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const types = ["Delivery", "Pickup", "Custom"];

function getStyles(type, orderType, theme) {
  return {
    fontWeight:
      orderType.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function OrderType() {
  const theme = useTheme();
  const [orderType, setOrderType] = React.useState([]);

  const count = 2; //Count of chips to show in one line

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setOrderType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }} size="small">
        <InputLabel id="demo-multiple-chip-label">
          Select Order Type*
        </InputLabel>
        <Select
          multiple
          value={orderType}
          onChange={handleChange}
          input={<OutlinedInput label="Select Order Type*" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, py: 0.5 }}>
              {selected.map((value, index) =>
                index < count ? (
                  <Chip
                    size="small"
                    key={value}
                    label={value}
                    onDelete={"delete"}
                  />
                ) : null
              )}
              {selected.length > count
                ? `& ${selected.length - count} more`
                : null}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, orderType, theme)}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
