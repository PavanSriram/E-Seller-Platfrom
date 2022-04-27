import * as React from "react";
import { useEffect } from "react"
import { Card, CardContent, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router";
import axios from "axios";

function UserProfile(props) {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));

  useEffect(() => {
    // console.log(localStorage.getItem("userId"));
    // setUserId(localStorage.getItem("userId"));
    let request = {userId: userId};
    console.log(request);
    async function fetchData() {
      await axios.post(`http://localhost:3308/user/profile`, request).then((res) => {
        setUserDetails(res.data[0]);
        console.log(res.data[0]);
      });
    }
    fetchData();
  }, [props]);

  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <Typography>
          <h3>Profile</h3>
          <hr />
            <p>First Name : {userDetails.firstName}</p>
            <p>Last Name : {userDetails.lastName}</p>
            <p>Email : {userDetails.email}</p>
            <p>Address : {userDetails.address}</p>
            <p>Phone Number : {userDetails.phoneNumber}</p>
            <hr />
            {/* <h3>Payment</h3>
            <hr />
            <p>Card Name : {props.firstName}</p>
            <p>Last Name : {props.lastName}</p>
            <p>Email : {props.email}</p>
            <p>Address : {props.address}</p>
            <p>Phone Number : {props.phoneNumber}</p> */}
            <Fab
              sx={{ position: "absolute", bottom: 70, right: 65 }}
              color="primary"
              // variant="extended"
              aria-label="add"
              onClick={() => navigate("/user/edituserprofile")}
            >
              <EditIcon sx={{ mr: 1 }} />
            </Fab>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserProfile;
