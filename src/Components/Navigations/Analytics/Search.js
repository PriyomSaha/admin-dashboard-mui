import React from "react";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { theme } from "Components/UI/themes";
function Search() {
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
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
    </>
  );
}

export default Search;
