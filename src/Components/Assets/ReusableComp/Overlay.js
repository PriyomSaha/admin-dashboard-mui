import { CircularProgress } from "@mui/material";
import React from "react";

const Overlay = ({ showOverlay }) => {
  return showOverlay ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "var(--shadow)",
        zIndex: 1000,
        pointerEvents: "auto", // Change to 'none' to allow interactions
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "#add8e9" }} />
    </div>
  ) : null;
};

export default Overlay;
