import { Box, Button, Grid } from "@mui/material";
import React, { useRef } from "react";
import SiteSettings from "./SiteSettings";
import SideNav from "./SideNav";
import SEO from "./SEO";
import SiteContactDetails from "./SiteContactDetails";
import TimeZone from "./TimeZone";
import Currency from "./Currency";

function General() {
  // const siteSettingsref = useRef(null);
  const refs = useRef([]);
  

  const handleClick = (index) => {
    window.scrollTo({
      // top: siteSettingsref.current.offsetTop - 100,
      top: refs.current[index].offsetTop - 100,
      behavior: "smooth",
    });
  };
  return (
    <Box width={"100%"}>
      <Grid container spacing={2}>
        <Grid container item spacing={5} md={10}>
          {/* <SiteSettings ref={siteSettingsref} /> */}
          <SiteSettings
            ref={(element) => {
              refs.current[0] = element;
            }}
          />
          <SEO
            ref={(element) => {
              refs.current[1] = element;
            }}
          />
          <SiteContactDetails
            ref={(element) => {
              refs.current[2] = element;
            }}
          />
          <TimeZone
            ref={(element) => {
              refs.current[3] = element;
            }}
          />
          <Currency
            ref={(element) => {
              refs.current[4] = element;
            }}
          />
        </Grid>

        <Grid item md={2}>
          <SideNav handleClick={handleClick} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default General;
