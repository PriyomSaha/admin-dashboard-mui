import { Box } from "@mui/material";
import { theme } from "Components/UI/themes";
import React from "react";

function SettingsSideNavWithRef({ sideNavList, handleClick }) {
  return (
    <>
      {/* Side Navigation Container */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" }, // Display flex on medium and larger screens, none on extra small screens
          flexDirection: "column", // Arrange items vertically
          justifyContent: "flex-start", // Align items at the start of the container
          color: "var(--links)", // Text color for links
          fontWeight: "500", // Text fontWeight for links
          borderLeft: `2px solid ${theme.palette.grey[500]}`, // Add a left border with a grey color
          paddingLeft: 2, // Add left padding
          position: "fixed", // Fix the navigation to the viewport
        }}
      >
        {/* Map through the sideNavList and render each item */}
        {sideNavList.map((item, index) => {
          return (
            <Box
              key={index}
              onClick={() => handleClick(index)} // Attach a click event to each item
              sx={{
                paddingY: 1, // Padding on the Y-axis (top and bottom)
                whiteSpace: "nowrap", // Prevent text from wrapping to the next line
                overflow: "hidden", // Hide overflowing content
                textOverflow: "ellipsis", // Show ellipsis if the text overflows
                cursor: "pointer", // Show a pointer cursor on hover
              }}
            >
              {item} {/* Display the item text */}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default SettingsSideNavWithRef;
