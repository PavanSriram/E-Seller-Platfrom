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
            <p>First Name : {props.firstName}</p>
            <p>Last Name : {props.lastName}</p>
            <p>Email : {props.email}</p>
            <p>Address : {props.address}</p>
            <p>Seller Id : {props.sellerId}</p>
            <p>Phone Number : {props.phoneNumber}</p>
            <p>Company Name : {props.companyName}</p>

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
