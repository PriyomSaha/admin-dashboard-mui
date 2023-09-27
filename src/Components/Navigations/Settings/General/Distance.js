import React, { forwardRef, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

// This functional component represents a section for selecting the default distance unit.
function Distance({}, ref) {
  // State to manage the selected distance unit, initialized with "km".
  const [distanceUnit, setDistanceUnit] = useState("km");

  return (
    <>
      {/* Section Header */}
      <Grid ref={ref} item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Default Distance Unit
          </Typography>
          {/* Description about the default distance unit settings */}
          <Typography>This includes Default Distance settings</Typography>
        </Box>
      </Grid>
      {/* Distance Unit Selection */}
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          {/* Paper component to create a visual container */}
          <Paper elevation={3}>
            <Box px={4} py={3}>
              {/* FormControl for form input control */}
              <FormControl fullWidth size="small">
                {/* Input label */}
                <InputLabel>Distance Unit</InputLabel>
                {/* Select component for choosing the distance unit */}
                <Select
                  label="Select Language"
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                >
                  {/* Menu items for different distance units */}
                  <MenuItem value="km">Kilometers</MenuItem>
                  <MenuItem value="mi">Miles</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

// Exporting the component with forwardRef to allow parent components to access its ref.
export default forwardRef(Distance);
