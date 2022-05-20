import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { mainListItems, secondaryListItems } from "./listItems";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DiscountIcon from '@mui/icons-material/Discount';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useEffect } from "react";


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}



function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const DashboardContent = (props) => {
  // console.log(props.child);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { pathname } = useLocation();
  const [sellerId, setUserId] = React.useState(localStorage.getItem("sellerId"));
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({});
  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/sellerprofile/'${sellerId}'`).then((res) => {
        setProfile(res.data[0]);
        // console.log("data", res);
      });
    }
    fetchData();
  }, []);


  const mainListItems = (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/seller/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/seller/myproducts")} >
        <ListItemIcon>
          <LocalMallIcon/>
        </ListItemIcon>
        <ListItemText primary="My Products" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/seller/orders")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders"/>
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/seller/payments")}> 
        <ListItemIcon>
          <PaymentsIcon/>
        </ListItemIcon>
        <ListItemText primary="Payments" />
      </ListItemButton>
    
      <ListItemButton onClick={() => navigate("/seller/discounts")}>
        <ListItemIcon>
          <DiscountIcon/>
        </ListItemIcon>
        <ListItemText primary="Discounts" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/seller/profile")}>
        <ListItemIcon>
          <PersonIcon/>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </React.Fragment>
  );
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {props.header}
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton color="inherit" onClick={() => navigate("/seller/signin")}>
                <LoginIcon/>&nbsp;<ListItemText primary="Login" />
              </IconButton>
              <IconButton color="inherit" onClick={() => navigate("/seller/signin")}>
                <LogoutIcon/>&nbsp;<ListItemText primary="Logout" />
              </IconButton>
              <IconButton color="inherit">
                <Avatar {...stringAvatar(`${profile.firstName} ${profile.lastName}`)} onClick={() => navigate("/seller/profile")}/>
              </IconButton>
              
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} /> */}
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {
            props.child
          }
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard(props) {
  return <DashboardContent header={props.header} child={props.child}/>;
}
