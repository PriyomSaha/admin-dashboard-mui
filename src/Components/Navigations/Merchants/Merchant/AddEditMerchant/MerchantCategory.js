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

const categories = [
  "Food",
  "Groceries & Dairy",
  "Breakfast & Tiffins",
  "Sea Food & Meat",
  "Snacks & Fastfood",
  "Pet Food & Accessories",
  "Bakery",
  "Flowers & Bouquets",
  "Stationery",
  "Pharmacy",
  "Clothing & Accessories",
  "Beverages",
  "Healthy Organics",
  "Novelties & Art",
  "Electronics",
  "Mother & Child Care",
];

function getStyles(category, merchantCategory, theme) {
  return {
    fontWeight:
      merchantCategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MerchantCategory() {
  const theme = useTheme();
  const [merchantCategory, setMerchantCategory] = React.useState([]);

  const count = 2; //Count of chips to show in one line

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMerchantCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }} size="small">
        <InputLabel id="demo-multiple-chip-label">Merchant Category</InputLabel>
        <Select
          multiple
          value={merchantCategory}
          onChange={handleChange}
          input={<OutlinedInput label="Merchant Category" />}
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
          {categories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              style={getStyles(category, merchantCategory, theme)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
