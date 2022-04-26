import * as React from "react";
import { useEffect } from "react"
import { Card, CardContent, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router";
import axios from "axios";

function UserProfile(props) {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({});

  useEffect(() => {
    async function fetchData() {
      await axios.post(`http://localhost:3306/user/profile`, props.user).then((res) => {
        setUser(res.data);
        console.log(res.data);
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
            <p>First Name : {user.firstName}</p>
            <p>Last Name : {user.lastName}</p>
            <p>Email : {user.email}</p>
            <p>Address : {user.address}</p>
            <p>Phone Number : {user.phoneNumber}</p>
            {props.user}
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
