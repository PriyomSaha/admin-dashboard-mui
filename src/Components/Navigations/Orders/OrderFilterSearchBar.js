import React from "react";
import { Button, Box, Stack, TextField, colors } from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "Components/UI/themes";

function OrderFilterSearchBar() {
  const [selected, setSelected] = useState("All");
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Stack
      spacing={2}
      direction={matches ? "row" : "column"}
      justifyContent="space-between"
      sx={{ flexWrap: "wrap" }}
      alignItems="center"
    >
      <Box>
        <Button
          onClick={() => setSelected("All")}
          variant={selected === "All" ? "contained-dark" : "outlined-dark"}
          sx={
            selected === "All"
              ? {
                  ":hover": {
                    background: theme.palette.grey[800],
                  },
                }
              : "null"
          }
        >
          All Orders
        </Button>
        <Button
          onClick={() => setSelected("Scheduled")}
          variant={
            selected === "Scheduled" ? "contained-dark" : "outlined-dark"
          }
          sx={
            selected === "Scheduled"
              ? {
                  ":hover": {
                    background: theme.palette.grey[800],
                  },
                }
              : "null"
          }
        >
          Scheduled
        </Button>
      </Box>

      <Box>
        <TextField
          size="small"
          placeholder="Serch Orders ..."
          variant="outlined"
        ></TextField>
      </Box>
    </Stack>
  );
}

export default OrderFilterSearchBar;
