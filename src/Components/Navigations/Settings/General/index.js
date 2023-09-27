import { Box, Grid } from "@mui/material";
import React, { useRef } from "react";
import SiteSettings from "./SiteSettings";
import SideNav from "./SideNav";
import SEO from "./SEO";
import SiteContactDetails from "./SiteContactDetails";
import TimeZone from "./TimeZone";
import Currency from "./Currency";
import Distance from "./Distance";
import AppLink from "./AppLink";
import SocialMediaLink from "./SocialMedia/SocialMediaLink";

function General() {
  // Create a ref to store references to child components
  const refs = useRef([]);

  // Function to scroll to a specific section when a navigation link is clicked
  const handleClick = (index) => {
    window.scrollTo({
      top: refs.current[index].offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <Box width={"100%"}>
      {/* Main Grid container */}
      <Grid container spacing={3}>
        {/* Left side of the page with settings */}
        <Grid container item spacing={5} md={10}>
          {/* Each setting section is a separate component */}
          {/* Attach a ref to each component to allow scrolling to them */}

          {/* Section 1: Site Settings */}
          <SiteSettings
            ref={(element) => {
              refs.current[0] = element; // Store a reference to this component
            }}
          />

          {/* Section 2: SEO Settings */}
          <SEO
            ref={(element) => {
              refs.current[1] = element;
            }}
          />

          {/* Section 3: Site Contact Details */}
          <SiteContactDetails
            ref={(element) => {
              refs.current[2] = element;
            }}
          />

          {/* Section 4: Time Zone */}
          <TimeZone
            ref={(element) => {
              refs.current[3] = element;
            }}
          />

          {/* Section 5: Currency */}
          <Currency
            ref={(element) => {
              refs.current[4] = element;
            }}
          />

          {/* Section 6: Distance */}
          <Distance
            ref={(element) => {
              refs.current[5] = element;
            }}
          />

          {/* Section 7: App Links */}
          <AppLink
            ref={(element) => {
              refs.current[6] = element;
            }}
          />

          {/* Section 8: Social Media Links */}
          <SocialMediaLink
            ref={(element) => {
              refs.current[7] = element;
            }}
          />
        </Grid>

        {/* Right side of the page with navigation */}
        <Grid item md={2}>
          {/* SideNav component with navigation links */}
          {/* When a link is clicked, the handleClick function is called to scroll to the corresponding section */}
          <SideNav handleClick={handleClick} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default General;
