import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ComponentBody, ComponentHeader } from "Components/Assets/GlobalStyles";
import React from "react";
import SettingsList from "./SettingsList";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { theme } from "Components/UI/themes";
import { useEffect } from "react";

function Settings() {
  const [list, setList] = useState(SettingsList);

  // Get the screen width
  const screenWidth = window.innerWidth;
  // Calculate the maximum width with based on the maximum length of list item
  const maxWidth = Math.max(...list.map((item) => item.label.length * 18));
  const width = Math.min(screenWidth, maxWidth);

  const handleInputChange = (event, value) => {
    if (value === "") {
      // Reset list to the original SettingsList when input is empty
      setList(SettingsList);
    } else {
      // Filter the SettingsList based on input value
      const filteredList = SettingsList.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setList(filteredList);
    }
  };
  const location = useLocation();
  let subPath = location.pathname.split("/").slice(-1);
  const navigate = useNavigate();

  const subPathContainSetting = subPath[0].includes("settings");
  return (
    <>
      <ComponentHeader>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap", display: "flex", alignItems: "center" }}
        >
          <Box>
            <Typography
              variant="h5"
              noWrap={true}
              sx={{
                fontWeight: "medium",
                letterSpacing: 1,
                fontSize: 25,
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
              }}
            >
              {!subPathContainSetting ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.grey[200],
                    alignSelf: "center",
                    display: "flex",
                    padding: 0.8,
                    borderRadius: 2,
                    cursor: "pointer",
                    marginRight: 1,
                  }}
                >
                  <TbArrowBackUpDouble onClick={() => navigate("/settings")} />
                </Box>
              ) : null}
              {subPath}
            </Typography>
          </Box>
          {subPathContainSetting ? (
            <Autocomplete
              disablePortal
              options={SettingsList}
              onInputChange={handleInputChange}
              sx={{ width: 250, mt: 2 }}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Settings" />
              )}
            />
          ) : null}
        </Stack>
      </ComponentHeader>
      <ComponentBody>
        <Box width="100%" display={"flex"} justifyContent={"center"} px={1}>
          {subPathContainSetting ? (
            <Grid
              container
              spacing={2}
              justifyContent="space-around"
              sx={{ flexWrap: "wrap" }}
            >
              {list.map((item, index) => (
                <Grid item key={index} onClick={() => navigate(`${item.path}`)}>
                  <Paper
                    sx={{
                      px: 2,
                      py: 2,
                      maxWidth: "100%", // Set the desired fixed width
                      width: `${width}px`, // Use the calculated maximum width
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center", // Center horizontally
                      "&:hover": {
                        cursor: "pointer", // Change to the desired cursor style
                        border: "1px solid blue",
                      },
                    }}
                  >
                    <span
                      style={{
                        // display: width < screenWidth ? "block" : "none",
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        background: theme.palette.grey[200],
                        padding: "0 3px", // Padding-x, 1px on the left and right
                        borderRadius: "10%",
                      }}
                    >
                      {item.icon}
                    </span>

                    <Typography
                      variant="h8"
                      fontWeight={600}
                      sx={{
                        ml: width < screenWidth ? 2 : 1,
                        textOverflow: width < 300 ? "ellipsis" : "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Outlet />
          )}
        </Box>
      </ComponentBody>
    </>
  );
}

export default Settings;
