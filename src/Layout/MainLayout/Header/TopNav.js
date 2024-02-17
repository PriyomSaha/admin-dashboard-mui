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
import { DrawerHeader } from "Components/UI/GlobalStyles";
import {
  useAccountStore,
  useDrawerStore,
  useEditProfileStore,
} from "Components/Assets/StateManagement";
import { Avatar, Badge, Fade } from "@mui/material";
import { useEffect } from "react";
import Edit from "Components/Navigations/EditProfile/Edit";
import { theme } from "Components/UI/themes";
import { deleteCookie } from "Components/Assets/UIServices";
import axios from "axios";

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
  const setUserData = useAccountStore((state) => state.setUserData);

  const setIsEditProfile = useEditProfileStore(
    (state) => state.setIsEditProfile
  );

  //For profile menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    // Calculate color brightness (simple luminance formula)
    const brightness =
      0.299 * parseInt(color.substr(1, 2), 16) +
      0.587 * parseInt(color.substr(3, 2), 16) +
      0.114 * parseInt(color.substr(5, 2), 16);

    return {
      bgColor: color,
      textColor: brightness > 128 ? "#000000" : "#FFFFFF", // Choose white for light colors, black for dark colors
    };
  }

  const getProfileUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_USER_DETAILS_URL;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const updateProfile = async () => {
    try {
      const requestBody = new URLSearchParams();
      requestBody.append("identifier", userData.email);

      const requestHeader = {
        "X-API-Key": API_KEY,
      };

      // Call authentication API to get token
      const resp = await axios.post(getProfileUrl, requestBody, {
        headers: requestHeader,
        withCredentials: true,
      });
      console.log(resp);
      await setAnchorEl(null);
      await setIsEditProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                  setAnchorEl((prevAnchorEl) =>
                    prevAnchorEl === null ? e.currentTarget : null
                  );
                }}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(
                        userData.firstName + userData.lastName
                      ).bgColor,
                      color: stringToColor(
                        userData.firstName + userData.lastName
                      ).textColor,
                    }}
                  >
                    {`${userData.firstName[0]}${userData.lastName[0]}`}
                  </Avatar>
                </StyledBadge>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {userData.firstName + " " + userData.lastName}
                  </Typography>
                </Box>
              </ProfileButton>
              <Menu
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                onClose={() => setAnchorEl(null)}
                TransitionComponent={Fade}
                anchorEl={anchorEl}
                open={open}
                PaperProps={{
                  elevation: 2,
                  style: {
                    backgroundColor: theme.palette.grey[400],
                  },
                }}
              >
                <MenuItem onClick={() => updateProfile()}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <MdAccountCircle style={{ marginRight: "8px" }} />
                    Edit Profile
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setUserData("", false);
                    deleteCookie("ud");
                    deleteCookie("email");
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <MdLogout style={{ marginRight: "8px" }} />
                    Logout
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Edit Profile */}
        <Edit />
      </Box>
    </>
  );
}
