import { Box } from "@mui/material";
import { theme } from "Components/UI/themes";
import React from "react";

function SideNav({ handleClick }) {
  const sideNavList = [
    "Site Settings",
    "Site SEO Settings",
    "Site Contact Details",
    "TimeZone Setting",
    "Currency Setting",
    "Distance Unit",
    "Mobile App Links",
    "Social Media Links",
  ];
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justify: "flex-start",
          color: "var(--links)",
          fontWeight: "500",
          borderLeft: `2px solid ${theme.palette.grey[500]}`,
          pl: 2,
          position: "fixed",
        }}
      >

        {sideNavList.map((item, index) => {
          return (
            <Box
              onClick={() => handleClick(index)}
              sx={{
                py: 1,
                flexWrap: "no-wrap",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
            >
              {item}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default SideNav;
