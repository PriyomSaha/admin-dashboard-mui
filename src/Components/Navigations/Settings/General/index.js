import { Box, Button, Grid } from "@mui/material";
import React, { useRef } from "react";
import SiteSettings from "./SiteSettings";
import SideNav from "./SideNav";
import SEO from "./SEO";
import SiteContactDetails from "./SiteContactDetails";
import TimeZoneSelect from "Components/Assets/ReusableComp/TimeZoneSelect";
import TimeZone from "./TimeZone";
import Currency from "./Currency";

function General() {
  const siteSettingsref = useRef(null);
  // const ref = useRef([]);

  const handleClick = (index) => {
    window.scrollTo({
      top: siteSettingsref.current.offsetTop - 115,
      // top: ref[index].current.offsetTop - 115,
      behavior: "smooth",
    });
  };
  return (
    <Box width={"100%"}>
      <Grid container spacing={2}>
        <Grid container item spacing={2} md={10}>
          <SiteSettings ref={siteSettingsref} />
          <SEO />
          <SiteContactDetails />
          <TimeZone />
          <Currency />
        </Grid>

        <Grid item md={2}>
          <SideNav handleClick={handleClick} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default General;
