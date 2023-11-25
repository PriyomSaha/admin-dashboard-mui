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
import { useLocation, useNavigate } from "react-router-dom";
import { MdClear, MdSearch } from "react-icons/md";
import { useEffect } from "react";

function PromotionNavigation() {
  const [selected, setSelected] = useState("Banners");
  const navigate = useNavigate();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const location = useLocation();

  useEffect(() => {
    const subPath = location.pathname.split("/").slice(-1)[0];
    setSelected(subPath.charAt(0).toUpperCase() + subPath.slice(1));
  }, [location]);

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
      <Stack
        spacing={2}
        direction={matches ? "row" : "column"}
        justifyContent="space-between"
        sx={{ flexWrap: "wrap" }}
        alignItems="center"
      >
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", overflow: "auto" }}>
            <Button
              onClick={() => {
                navigate("/promotions");
                setSelected("Banners");
              }}
              variant={
                selected === "Banners" ? "contained-dark" : "outlined-dark"
              }
            >
              Banners
            </Button>

            <Button
              onClick={() => {
                navigate("/promotions/coupons");
                setSelected("Coupons");
              }}
              variant={
                selected === "Coupons" ? "contained-dark" : "outlined-dark"
              }
            >
              Coupons
            </Button>

            <Button
              onClick={() => {
                navigate("/promotions/popups");
                setSelected("Popups");
              }}
              variant={
                selected === "Popups" ? "contained-dark" : "outlined-dark"
              }
            >
              Popups
            </Button>
          </Box>
        </Box>
        <Box>
          <TextField
            size="small"
            placeholder={`Search ${selected} ...`}
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

export default PromotionNavigation;
