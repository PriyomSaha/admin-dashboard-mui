import { Box, Grid } from "@mui/material";
import pluginsList from "./toolbarIconsList";
import table from "./toolbarIconsList";
import useOnClickListener from "./useOnClickListener";

const Toolbar = () => {
  const { onClick } = useOnClickListener();
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
    </Grid>
  );
};

export default Toolbar;
