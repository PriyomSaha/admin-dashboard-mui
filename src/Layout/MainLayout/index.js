import { Box, useMediaQuery } from "@mui/material";
import SideNav from "Layout/MainLayout/Header/SideNav";
import TopNav from "Layout/MainLayout/Header/TopNav";
import { theme } from "Components/UI/themes";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAccountStore } from "Components/Assets/StateManagement";
import { BufferHeightofBody } from "Components/UI/GlobalStyles";

// Functional component 'MainLayout' representing the main layout of the application
function MainLayout() {
  // Use the 'useMediaQuery' hook to check if the screen size is small (sm) or below
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const userData = useAccountStore((state) => state.userData);
  return (
    <>
      {!userData.authStatus ? (
        <Navigate to="/login" />
      ) : (
        <>
          {/* Display the TopNav component at the top of the layout */}
          <TopNav />

          {/* The main container to hold SideNav and the content */}
          <Box>
            {/* Display the SideNav component */}
            <SideNav />
            {/* The main content area */}
            {/* 'Box' element with 'flexGrow: 1' property takes up remaining horizontal space */}
            {/* 'ml: 0' sets no left margin on small screens, 'ml: 8' adds a left margin on larger screens */}
            <Box sx={{ flexGrow: 1, ml: isSmall ? 0 : 8 }}>
              {/* Display the Outlet component to render the content of the current route based on auth status*/}
              {!userData.authStatus ? <Navigate to="/login" /> : <Outlet />}
            </Box>
          </Box>
          <BufferHeightofBody />
        </>
      )}
    </>
  );
}

// Export the MainLayout component as the default export
export default MainLayout;

/** Comments Explanation:

The code imports required modules and components from MUI (Material-UI) and other components from the application.

The MainLayout functional component represents the main layout of the application.

The component uses the useMediaQuery hook from MUI to check if the screen size is small (sm) or below. The isSmall variable is used to determine the layout for different screen sizes.

The component returns the main layout structure using the Box component for layout management.

The TopNav component is displayed at the top of the layout to show the top navigation bar.

The main container Box holds both the SideNav and the main content area.

The SideNav component is displayed in the main container to show the side navigation bar.

The main content area is represented by a Box element with flexGrow: 1, which means it will take up the remaining horizontal space.

The ml: 0 style property sets no left margin when the screen size is small (sm) or below, resulting in a full-width content area.

The ml: 8 style property sets a left margin of 8 units when the screen size is larger than small, providing space for the side navigation.

The Outlet component is used to render the content of the current route, which is a feature provided by react-router-dom.

The MainLayout component provides a consistent layout structure for the application, with the top navigation, side navigation, and main content area. It adapts to different screen sizes, providing a responsive user experience.
 */
