// import * as React from "react";
// import { useState } from "react";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LayersIcon from "@mui/icons-material/Layers";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import LogoutIcon from "@mui/icons-material/ExitToApp";
// import { useNavigate } from "react-router";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// let dropDown = false;

// const handleCategoryClick = () => {
//   console.log("clicked")
  
//   dropDown = !dropDown;
//   console.log(dropDown)
// };

// export const MainListItems = () => {
//   // return (
//   <React.Fragment>
//     <ListItemButton
//       onClick={() => {
//         useNavigate("/user/dashboard");
//       }}
//     >
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         useNavigate("/user/orders");
//       }}
//     >
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="My Orders" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         useNavigate("/user/settings");
//       }}
//     >
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Settings" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         useNavigate("/user/cart");
//       }}
//     >
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Cart" />
//     </ListItemButton>
//     <ListItemButton onClick={handleCategoryClick}>
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Categories" />
//       { dropDown===true ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
//     </ListItemButton>
//     <ListItemButton
//       // {dropDown ? : sx={{}} }
//       onClick={() => {
//         useNavigate("/fashion");
//       }}
//     >
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Fashion" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         useNavigate("/electronics");
//       }}
//     >
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Electronics" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         useNavigate("/sports");
//       }}
//     >
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Sports" />
//     </ListItemButton>
//   </React.Fragment>
//   };

// export const secondaryListItems = () => {
//   // return (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <LogoutIcon />
//       </ListItemIcon>
//       <ListItemText primary="Logout" />
//     </ListItemButton>
//     {/* <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton> */}
//   </React.Fragment>
// };

