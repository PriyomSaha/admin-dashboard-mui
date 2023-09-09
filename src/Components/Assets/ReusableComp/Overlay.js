import { CircularProgress } from "@mui/material"; // Importing CircularProgress component from Material-UI
import React from "react";

// Overlay component that displays a loading spinner when `showOverlay` is true
const Overlay = ({ showOverlay }) => {
  return showOverlay ? (
    // If `showOverlay` is true, render the overlay
    <div
      style={{
        position: "fixed", // Fixes the element in the viewport
        top: 0, // Position at the top of the viewport
        left: 0, // Position at the left of the viewport
        width: "100%", // Take up the entire viewport width
        height: "100%", // Take up the entire viewport height
        backgroundColor: "var(--shadow)", // Semi-transparent background color
        zIndex: 1000, // Sets the stacking order (higher numbers are on top)
        pointerEvents: "auto", // Allows interactions with elements beneath (change to "none" to prevent interactions)
        display: "flex", // Use flexbox layout
        justifyContent: "center", // Horizontally center the content
        alignItems: "center", // Vertically center the content
      }}
    >
      {/* CircularProgress component displaying a loading spinner */}
      <CircularProgress sx={{ color: "var(--circular-progress)" }} />
    </div>
  ) : null; // If `showOverlay` is false, render nothing
};

export default Overlay; // Export the Overlay component for use in other parts of the application
