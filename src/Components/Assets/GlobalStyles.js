import { styled } from "@mui/material/styles";
import { theme } from "Components/UI/themes";

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

//This Style is for image in table cell
export const TableImage = {
  width: "5vh",
  height: "5vh",
  display: "flex",
  alignSelf: "center",
  borderRadius: "10px",
};

//Super Admin login for Merchant and Customer
export const SuperAdminLoginButton = styled("Button")(({ theme }) => ({
  boxShadow: theme.shadows[10],
  background: "var(--super-admin-login-button-background)",
  color: "var(--super-admin-login-button-text)",
  border: "1px solid var(--super-admin-login-button-text)",
  borderRadius: "5px",
  padding: theme.spacing(1, 2),
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
}));

// Styling for the Modal component
export const ModalStyle = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 50,
  p: 2,
  borderRadius: "10px",
  [theme.breakpoints.between(0, 400)]: {
    width: "100%",
  },
};
