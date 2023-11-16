import React, { forwardRef, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CustomSwitch } from "Components/UI/GlobalStyles";

function OrderTip({}, ref) {
  const [enabled, setEnabled] = useState(true);
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("english");
  const [tipType, setTipType] = useState("amount");
  const [tip1, setTip1] = useState(20);
  const [tip2, setTip2] = useState(30);
  const [tip3, setTip3] = useState(50);

  return (
    <>
      {/* Grid for Site Settings Section */}
      <Grid ref={ref} item xs={12} sm={6}>
        <Box mt={2}>
          {/* Section Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Order Tip
          </Typography>
          {/* Section Description */}
          <Typography>Would you like to add a tip to your order?</Typography>
        </Box>
      </Grid>

      {/* Grid for the Site Settings Form */}
      <Grid
        container
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box width={"100%"}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" onClick={() => setEnabled(false)}>
              DISABLE
            </Typography>
            <CustomSwitch
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography variant="h6" onClick={() => setEnabled(true)}>
              <b>ENABLE</b>
            </Typography>
          </Stack>
        </Box>
        <Box width={"100%"} mt={1}>
          <Paper elevation={3}>
            <Box px={4} py={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ flexWrap: "wrap" }}
                gap={2}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  Order Tip Description
                </Typography>

                <FormControl
                  sx={{ minWidth: "150px" }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel>Select Language</InputLabel>
                  <Select
                    label="Select Language"
                    onChange={(e) => setLanguage(e.target.value)}
                    value={language}
                    disabled={!enabled}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <TextField
                fullWidth
                label="Enter Description"
                placeholder="Enter Description"
                variant="outlined"
                size="small"
                value={description} // Set value to state variable
                onChange={(e) => setDescription(e.target.value)} // Update state on input change
                sx={{ mt: 2 }}
                disabled={!enabled}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
                TIP OPTIONS
              </Typography>

              <RadioGroup
                row
                value={tipType}
                onChange={(e) => setTipType(e.target.value)}
              >
                <FormControlLabel
                  value="percentage"
                  control={<Radio />}
                  label="Tip by percentage"
                  disabled={!enabled}
                />
                <FormControlLabel
                  value="amount"
                  control={<Radio />}
                  label="Tip by fixed amount"
                  disabled={!enabled}
                />
              </RadioGroup>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                sx={{ flexWrap: "wrap" }}
              >
                <TextField
                  label={tipType === "amount" ? "Rs" : "%"}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px", mt: 1 }}
                  type="number" // Set the input type to "number"
                  value={tip1}
                  onChange={(e) =>
                    setTip1(Math.min(100, Math.max(0, e.target.value)))
                  }
                  disabled={!enabled}
                />
                <TextField
                  label={tipType === "amount" ? "Rs" : "%"}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px", mt: 1 }}
                  type="number" // Set the input type to "number"
                  value={tip2}
                  onChange={(e) =>
                    setTip2(Math.min(100, Math.max(0, e.target.value)))
                  }
                  disabled={!enabled}
                />
                <TextField
                  label={tipType === "amount" ? "Rs" : "%"}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px", mt: 1 }}
                  type="number" // Set the input type to "number"
                  value={tip3}
                  onChange={(e) =>
                    setTip3(Math.min(100, Math.max(0, e.target.value)))
                  }
                  disabled={!enabled}
                />
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(OrderTip);
