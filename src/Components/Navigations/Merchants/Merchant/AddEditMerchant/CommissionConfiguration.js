import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { orderStatus } from "Components/Assets/NavigationsProvider";
import { theme } from "Components/UI/themes";
import React from "react";

function CommissionConfiguration() {
  const [value, setValue] = React.useState("percentage");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6"> Commission Configuration</Typography>
      <Typography variant="h7" color={theme.palette.grey[700]}>
        Set your commission Configuration.
      </Typography>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 1,
          p: 2,
          mt: 1,
          background: theme.palette.grey[100],
        }}
      >
        <Typography sx={{ mb: 2 }} fontWeight={500}>
          Commission Type*
        </Typography>
        <FormControl>
          <RadioGroup value={value} onChange={handleChange}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="percentage"
                  control={<Radio />}
                  label="Percentage"
                />
              </Grid>
              <Grid item xs={6}>
                {value === "percentage" ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{ float: "right", width: "80px" }}
                    inputProps={{
                      min: "1",
                      max: "100",
                      step: 1, // The increment/decrement step for the input value
                    }}
                  />
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="fixed"
                  control={<Radio />}
                  label="Fixed"
                />
              </Grid>
              <Grid item xs={6}>
                {value === "fixed" ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{ float: "right", width: "80px" }}
                    inputProps={{
                      min: "1",
                      max: "999",
                      step: 1, // The increment/decrement step for the input value
                    }}
                  />
                ) : null}
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ mt: 2 }} fontWeight={500}>
              Calculate On Status
            </Typography>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mt: 2 }}
            >
              <InputLabel>Calculate On Status</InputLabel>
              <Select label="Calculate On Status">
                {orderStatus.map((value, index) => (
                  <MenuItem value={value} key={index}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CommissionConfiguration;
