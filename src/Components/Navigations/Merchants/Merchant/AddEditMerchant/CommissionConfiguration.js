import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
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
import { MdClear } from "react-icons/md";

function CommissionConfiguration({
  commisionType,
  setCommisionType,
  commisionValue,
  setCommisionValue,
  commisionCondition,
  setCommisionCondition,
}) {
  const handleCommisionValueChange = (event) => {
    const input = event.target.value;
    // Check if input is a number and within the specified range (1-100 for Percentage and 1-999 for fixed)
    if (commisionType === "percentage") {
      if (!isNaN(input) && parseInt(input) >= 0 && parseInt(input) <= 100) {
        setCommisionValue(input);
      }
    } else {
      if (!isNaN(input) && parseInt(input) >= 0 && parseInt(input) <= 999) {
        setCommisionValue(input);
      }
    }
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
          <RadioGroup
            value={commisionType}
            onChange={(e) => {
              setCommisionType(e.target.value);
              setCommisionValue(0);
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="percentage"
                  control={<Radio />}
                  label="Percentage"
                />
              </Grid>
              <Grid item xs={6}>
                {commisionType === "percentage" ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ float: "right", width: "100px" }}
                    InputProps={{
                      // type: "number",
                      min: "0",
                      max: "999",
                      step: "1",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setCommisionValue(0)}
                          >
                            <MdClear />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={commisionValue}
                    onChange={(e) => {
                      handleCommisionValueChange(e);
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
                {commisionType === "fixed" ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ float: "right", width: "100px" }}
                    InputProps={{
                      // type: "number",
                      min: "0",
                      max: "999",
                      step: "1",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setCommisionValue(0)}
                          >
                            <MdClear />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={commisionValue}
                    onChange={(e) => {
                      handleCommisionValueChange(e);
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
              <Select
                label="Calculate On Status"
                value={commisionCondition}
                onChange={(e) => setCommisionCondition(e.target.value)}
              >
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
