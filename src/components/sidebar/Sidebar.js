import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Links from "./Links";
import DataGrid from "../data-grid";
import ClientGrid from "../client-grid";
import ProjectGrid from "../project-grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import LaptopChromebookRoundedIcon from "@mui/icons-material/LaptopChromebookRounded";
import HelpIcon from "@mui/icons-material/Help";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import SkillGrid from "../skill-grid/SkillGrid";

const drawerWidth = 200;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Wissen Technology
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div className="header-logo">
            <img src="img/wissen-technology-logo.jpg" />
          </div>
          {!open ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 0,
                ...(open && { display: "none" }),
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          <NavLink to="/" className="nav-link">
            <Links
              open={open}
              text="Employee"
              icon={<PersonAddAlt1RoundedIcon />}
            />
          </NavLink>
          <NavLink to="/client" className="nav-link">
            <Links open={open} text="Client" icon={<BadgeRoundedIcon />} />
          </NavLink>
          <NavLink to="/project" className="nav-link">
            <Links
              open={open}
              text="Project"
              icon={<LaptopChromebookRoundedIcon />}
            />
          </NavLink>
          <NavLink to="/skill" className="nav-link">
            <Links
              open={open}
              text="Skill"
              icon={<LaptopChromebookRoundedIcon />}
            />
          </NavLink>
        </List>
        <Divider />
        <List>
          <NavLink to="#" className="nav-link">
            <Links open={open} text="Help" icon={<HelpIcon />} />
          </NavLink>
          <NavLink to="#" className="nav-link">
            <Links open={open} text="Support" icon={<SupportAgentIcon />} />
          </NavLink>
        </List>
      </Drawer>
      <Box component="main" sx={{ width: 1 / 2, flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        <Routes>
          <Route exact path="/" element={<DataGrid />} />
          <Route path="/client" element={<ClientGrid />} />
          <Route path="/project" element={<ProjectGrid />} />
          <Route path="/skill" element={<SkillGrid />} />
        </Routes>
      </Box>
    </Box>
  );
}
