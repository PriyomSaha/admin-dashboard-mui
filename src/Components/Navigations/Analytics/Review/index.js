import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DateRangePicker from "Components/Assets/ReusableComp/DateRangePicker";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import React from "react";

function Review() {
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <ComponentBody>
        <Stack
          spacing={2}
          direction={matches ? "column" : "row"}
          sx={{ flexWrap: "wrap" }}
        >
          <Autocomplete
            disablePortal
            // options={MerchantssList}
            // onInputChange={handleInputChange}
            sx={matches ? null : { minWidth: 400 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Merchants..." />
            )}
          />
          <Button variant="contained-dark">Search</Button>
        </Stack>
      </ComponentBody>
    </>
  );
}

export default Review;
