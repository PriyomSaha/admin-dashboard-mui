import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import {
  MdMenu,
  MdClose,
  MdSearch,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";
import { DrawerHeader } from "../../Assets/GlobalStyles";
import { useAccountStore, useDrawerStore } from "../../Assets/StateManagement";
import { Fade } from "@mui/material";
import { useEffect } from "react";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: `var(--header-nav-background)`,
  height: "auto",
}));

const ProfileButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("md")]: { borderRadius: "15px" },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function TopNav() {
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen);
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);

  const userData = useAccountStore((state) => state.userData);

  //For profile menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    let appbarHeight = document.getElementById("appBar").clientHeight;
    console.log("appbarHeight", appbarHeight);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <AppBar position="fixed" id="appBar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={setDrawerOpen}
          >
            {isDrawerOpen ? <MdClose /> : <MdMenu />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            LOGO
          </Typography>
          <Search>
            <SearchIconWrapper>
              <MdSearch />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={() => true}
          >
            <ProfileButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            >
              <MdAccountCircle />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography sx={{ marginLeft: "10px" }}>
                  {userData.userName}
                </Typography>
              </Box>
            </ProfileButton>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                }}
              >
                Edit Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
