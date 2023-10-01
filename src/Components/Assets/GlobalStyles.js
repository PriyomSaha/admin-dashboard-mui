import { Switch } from "@mui/material";
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
  background: "var(--component-header-background)",
  color: "var(--component-header-text)",
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
  background: "var(--component-body-background)",
  color: "var(--component-body-text)",
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
export const SuperAdminLoginButton = styled("button")(({ theme }) => ({
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

export const FullScreenModalContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const FullScreenModalContent = {
  outline: "none",
  backgroundColor: theme.palette.grey[200],
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  padding: theme.spacing(2),
  minWidth: "50vw",
  maxWidth: "100vw",
  minHeight: "20vh",
  maxHeight: "80vh",
  overflow: "auto",
};

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 20,
    height: 20,
    margin: 0,
  },
}));
