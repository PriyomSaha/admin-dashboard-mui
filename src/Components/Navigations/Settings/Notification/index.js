import React, { useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import SideNav from "Components/Assets/ReusableComp/SettingsSideNavWithRef";
import LanguageTemplateChannelSoundSettings from "./LanguageTemplateChannelSoundSettings";
import Admin from "./Template/Admin/Admin";
import Sound from "./Sound/Sound";

function Notification() {
  // Create a ref to store references to child components
  const refs = useRef([]);

  // Function to scroll to a specific section when a navigation link is clicked
  const handleClick = (index) => {
    window.scrollTo({
      top: refs.current[index].offsetTop - 100,
      behavior: "smooth",
    });
  };

  // List of items for the side navigation
  const sideNavList = [
    "Admin Notifications",
    "Customer Notifications",
    "Merchant Notifications",
  ];
  const [settingsType, setSettingsType] = useState("Template");
  return (
    <Box width={"100%"}>
      {/* Main Grid container */}
      <Grid container spacing={3}>
        {/* Left side of the page with settings */}
        <Grid container item spacing={4} md={10}>
          {/* Each setting section is a separate component */}
          {/* Attach a ref to each component to allow scrolling to them */}
          <Grid item xs={12}>
            <LanguageTemplateChannelSoundSettings
              selected={settingsType}
              setSelected={setSettingsType}
            />
            {settingsType === "Template" ? (
              <>
                <Admin
                  ref={(element) => {
                    refs.current[0] = element; // Store a reference to this component
                  }}
                />
              </>
            ) : settingsType === "Sound" ? (
              <>
                <Sound />
              </>
            ) : null}
          </Grid>
        </Grid>

        {/* Right side of the page with navigation */}
        <Grid item md={2}>
          {/* SideNav component with navigation links */}
          {/* When a link is clicked, the handleClick function is called to scroll to the corresponding section */}
          {settingsType === "Template" ? (
            <SideNav sideNavList={sideNavList} handleClick={handleClick} />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Notification;
