import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router";


function SellerProfile(props) {
  const navigate = useNavigate();
  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <Typography>
            <p><Typography fontSize={"15px"} fontWeight="600">First Name</Typography>  {props.firstName}Henry</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Last Name</Typography>  {props.lastName}Warron</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Email</Typography>  {props.email}henrywarron@gmail.com</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Address</Typography>  {props.address}Ahmedabad, Gujarat</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Seller Id</Typography>  {props.sellerId}025</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Phone Number</Typography>  {props.phoneNumber}2054781496</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Company Name</Typography>  {props.companyName}Henry Home Essentials</p>

            <Fab
              sx={{ position: "absolute", bottom: 70, right: 65 }}
              color="primary"
              // variant="extended"
              aria-label="add"
              onClick={() => navigate("/seller/editsellerprofile")}
            >
              <EditIcon sx={{ mr: 1 }} />
            </Fab>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SellerProfile;
