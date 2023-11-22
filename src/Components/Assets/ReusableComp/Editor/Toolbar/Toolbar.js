import { Box, Grid } from "@mui/material";
import pluginsList from "./toolbarIconsList";
import table from "./toolbarIconsList";
import useOnClickListener from "./useOnClickListener";
import FloatingLinkEditor from "../FloatingLinkEditor.js";
import { createPortal } from "react-dom";

const Toolbar = () => {
  const { onClick, isLink, editor, modal, showModal } = useOnClickListener();
  return (
    <Grid
      container
      sx={{
        background: "white",
        mt: 1,
        ml: "1px",
        width: "100%",
        p: 1,
      }}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      // spacing={2}
    >
      {pluginsList.map((plugin, index) => (
        <Grid
          item
          key={plugin.id}
          display="flex"
          alignSelf="center"
          sx={{ cursor: "pointer" }}
          p={0.5}
        >
          <plugin.Icon onClick={() => onClick(plugin.event)} />
        </Grid>
      ))}
      {modal}
      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
    </Grid>
  );
};

export default Toolbar;
