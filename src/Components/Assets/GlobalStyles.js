import { styled } from "@mui/material/styles";

export const drawerWidth = 200;

//Use this at start of  "position:fixed elements" so that element is not hidden
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// This is Component name or the navigation names container
export const ComponentHeader = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 4),
  boxShadow: theme.shadows[3],
  width: "100%",
  color: "#444444",
  background: "#ffffff",
  maxWidth: "100vw",
  position: "sticky",
  top: "64px",
  zIndex: theme.zIndex.drawer - 1,
  // maxWidth: `calc(100vw - ${drawerWidth}px)`,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1, 1),
    top: "56px",
  },
}));

// This is Component Body or the navigation Body container
export const ComponentBody = styled("div")(({ theme }) => ({
  // overflowX: "hidden",
  marginTop: "1vh",
  padding: theme.spacing(1, 2),
  boxShadow: theme.shadows[10],
  background: "#f8f8f8",
  color: "#444444",
  minHeight: "100vh",
  maxWidth: "100vw",
  // [theme.breakpoints.down("md")]: { padding: theme.spacing(2, 1) },
}));
