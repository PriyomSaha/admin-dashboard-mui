// Importing required modules and components from React and MUI library
import React from "react";
import {
  Button,
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "Components/UI/themes";
import { MdSearch, MdClear } from "react-icons/md";

// Functional component 'OrderFilterSearchBar' for filtering orders based on user input
function OrderFilterSearchBar() {
  // State variable to track the selected filter option (All or Scheduled)
  const [selected, setSelected] = useState("All");

  // Media query to check if the screen size matches 'sm' breakpoint or higher
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  // State to manage the search text
  const [searchText, setSearchText] = useState("");

  // Event handler for updating the search text as the user types
  const handleSearchChange = (event) => {
    // When the user types in the input, update the searchText state with the current value
    setSearchText(event.target.value);
  };

  // Event handler to clear the search text when the cross button is clicked
  const handleClearSearch = () => {
    // When the cross button is clicked, set the searchText state to an empty string to clear the search
    setSearchText("");
  };

  return (
    <>
      {/* Stack container to arrange components with appropriate spacing and direction */}
      <Stack
        spacing={2}
        direction={matches ? "row" : "column"}
        justifyContent="space-between"
        sx={{ flexWrap: "wrap" }}
        alignItems="center"
      >
        <Box>
          {/* Button to filter orders by "All" */}
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
                : null
            }
          >
            All Orders
          </Button>

          {/* Button to filter orders by "Scheduled" */}
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
                : null
            }
          >
            Scheduled
          </Button>
        </Box>

        <Box>
          {/* TextField to input search criteria for filtering orders */}
          <TextField
            size="small"
            placeholder="Search Orders ..."
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              // Adding the search icon to the start of the input
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch />
                </InputAdornment>
              ),
              // Adding the clear button to the end of the input (only when there's text)
              endAdornment: (
                <InputAdornment position="end">
                  {searchText && ( // Render the clear button only if there's text in the input
                    <IconButton edge="end" onClick={handleClearSearch}>
                      <MdClear />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>
      </Stack>
    </>
  );
}

export default OrderFilterSearchBar;

/**Comments Explanation:

The code imports required modules and components from React and MUI (Material-UI) libraries.

The OrderFilterSearchBar functional component is responsible for filtering orders based on user input.

The component uses the useState hook to manage the selected state variable, representing the currently selected filter option (All or Scheduled).

The component uses the useMediaQuery hook from MUI to check if the screen size matches the 'sm' breakpoint or higher. The matches variable is used to determine the layout for different screen sizes.

The component returns a JSX fragment containing the main content structure using the Box and Stack components from MUI.

The Stack container arranges the filter buttons and search field components with appropriate spacing and direction based on the screen size. It uses the matches value to determine the direction (row or column) of the stack.

The Box component is used to group the filter buttons and apply common styles to them.

The first filter button, "All Orders," is a Button component that filters orders by "All" status. The selected state is used to set the variant (contained or outlined) based on whether it is currently selected or not. The sx property is used to customize the styles when the button is selected.

The second filter button, "Scheduled," functions similarly to the "All Orders" button. It filters orders by "Scheduled" status.

The Box component is used to group the search TextField component and apply common styles to it.

The TextField is used for users to input search criteria for filtering orders. It has a placeholder text, "Search Orders ...," and is displayed with an outlined variant.

The OrderFilterSearchBar component provides a user-friendly way for users to filter orders based on different criteria, enhancing the user experience of the application. It adjusts its layout based on the screen size to provide a responsive design. */
