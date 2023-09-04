import { Box } from "@mui/material";
import { theme } from "Components/UI/themes";
import React from "react";

function SideNav({ handleClick }) {
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
        <Box
          onClick={() => handleClick(0)}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            cursor: "pointer",
          }}
        >
          Site Settings
        </Box>
        <Box
          onClick={() => {}}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Site SEO Settings
        </Box>
        <Box
          onClick={() => {}}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Site Contact Details
        </Box>
        <Box
          onClick={() => {}}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          TimeZone Setting
        </Box>
        <Box
          onClick={() => {}}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Currency Setting
        </Box>
        <Box
          onClick={() => {}}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Distance Unit
        </Box>
        <Box
          onClick={() => {}}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Mobile App Links
        </Box>
        <Box
          onClick={() => {}}
          sx={{
            py: 1,
            flexWrap: "no-wrap",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Social Media Links
        </Box>
      </Box>
    </>
  );
}

export default SideNav;
