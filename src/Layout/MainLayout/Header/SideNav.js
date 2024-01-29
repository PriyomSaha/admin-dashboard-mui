import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { DrawerHeader, drawerWidth } from "Components/UI/GlobalStyles";
import { MdExpandLess, MdExpandMore, MdSpaceDashboard } from "react-icons/md";
import {
  BiSolidPackage,
  BiSolidStarHalf,
  BiSolidShoppingBags,
} from "react-icons/bi";
import { BsPeopleFill, BsGraphUpArrow } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useDrawerStore } from "Components/Assets/StateManagement";
import { Collapse, useMediaQuery } from "@mui/material";
import { VscGraphLine } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import { theme } from "Components/UI/themes";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    width: 0,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isDrawerOpen",
})(({ theme, isDrawerOpen }) => ({
  width: drawerWidth,
  // position: "fixed",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  // zIndex: 999,
  ...(isDrawerOpen && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!isDrawerOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NavIcon = styled(ListItemIcon)(({ theme, isDrawerOpen }) => ({
  minWidth: 0,
  justifyContent: "center",
  color: "whitesmoke",
}));

export default function SideNav() {
  const navigate = useNavigate();
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen);

  const location = useLocation();

  // Check if the screen size is "sm" (600px) or smaller
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [analyticsOpen, setAnalyticsOpen] = React.useState(false);

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" isDrawerOpen={isDrawerOpen}>
        <DrawerHeader />
        <List>
          {/* ===== Dashboard ===== */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/dashboard");
              if (isSmDown) {
                setDrawerOpen();
              }
            }}
            className={location.pathname === "/dashboard" ? "active" : null}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                <MdSpaceDashboard />
              </NavIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* ===== Orders ===== */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/orders");
              if (isSmDown) {
                setDrawerOpen();
              }
            }}
            className={location.pathname === "/orders" ? "active" : null}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                <BiSolidPackage />
              </NavIcon>
              <ListItemText
                primary="Orders"
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* ===== Merchants ===== */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/merchants");
              if (isSmDown) {
                setDrawerOpen();
              }
            }}
            className={
              location.pathname.includes("merchants") ? "active" : null
            }
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                <BiSolidShoppingBags />
              </NavIcon>
              <ListItemText
                primary="Merchants"
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* ===== Customers ===== */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/customers");
              if (isSmDown) {
                setDrawerOpen();
              }
            }}
            className={location.pathname === "/customers" ? "active" : null}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                <BsPeopleFill />
              </NavIcon>
              <ListItemText
                primary="Customers"
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* ===== Promotions ===== */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/promotions");
              if (isSmDown) {
                setDrawerOpen();
              }
            }}
            className={
              location.pathname.includes("promotions") ? "active" : null
            }
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                <BsGraphUpArrow />
              </NavIcon>
              <ListItemText
                primary="Promotions"
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* ===== Analytics ===== */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => setAnalyticsOpen(!analyticsOpen)}
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                <TbReportAnalytics />
              </NavIcon>
              <ListItemText
                primary="Analytics"
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
              {analyticsOpen ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={analyticsOpen} unmountOnExit>
              <List disablePadding sx={{ cursor: "pointer" }}>
                <ListItem
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/analytics/business");
                    if (isSmDown) {
                      setDrawerOpen();
                    }
                  }}
                  className={
                    location.pathname === "/analytics/business"
                      ? "active"
                      : null
                  }
                >
                  <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                    <VscGraphLine />
                  </NavIcon>
                  <ListItemText
                    primary="Buisness"
                    sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                  />
                </ListItem>

                <ListItem
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/analytics/review");
                    if (isSmDown) {
                      setDrawerOpen();
                    }
                  }}
                  className={
                    location.pathname === "/analytics/review" ? "active" : null
                  }
                >
                  <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                    <BiSolidStarHalf />
                  </NavIcon>
                  <ListItemText
                    primary="Review"
                    sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                  />
                </ListItem>

                <ListItem
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/analytics/reports");
                    if (isSmDown) {
                      setDrawerOpen();
                    }
                  }}
                  className={
                    location.pathname === "/analytics/reports" ? "active" : null
                  }
                >
                  <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                    <TbReport />
                  </NavIcon>
                  <ListItemText
                    primary="Reports"
                    sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                  />
                </ListItem>
              </List>
            </Collapse>
          </ListItem>

          {/* ===== Settings ===== */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/settings");
              if (isSmDown) {
                setDrawerOpen();
              }
            }}
            className={location.pathname === "/settings" ? "active" : null}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <NavIcon sx={{ mr: isDrawerOpen ? 3 : "auto" }}>
                <AiFillSetting />
              </NavIcon>
              <ListItemText
                primary="Settings"
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
