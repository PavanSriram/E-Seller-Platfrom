import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";


function SellerProfile(props) {
  const navigate = useNavigate();
  const [sellerId, setUserId] = React.useState(localStorage.getItem("sellerId"));

  const [profile, setProfile] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    sellerId: sellerId,
    phoneNumber: '',
    companyName: '',
  });
  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/sellerprofile/'${sellerId}'`).then((res) => {
        setProfile(res.data[0]);
        // console.log("data", res);
      });
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <Typography>
            <p><Typography fontSize={"15px"} fontWeight="600">First Name</Typography>  {profile.firstName}</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Last Name</Typography>  {profile.lastName}</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Email</Typography>  {profile.email}</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Address</Typography>  {profile.address}</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Seller Id</Typography>  {profile.sellerId}</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Phone Number</Typography>  {profile.phoneNumber}</p>
            <p><Typography fontSize={"15px"} fontWeight="600">Company Name</Typography>  {profile.companyName}</p>

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
