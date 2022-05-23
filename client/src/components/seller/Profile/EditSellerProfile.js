import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Card, CardContent, Stack } from "@mui/material";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

export default function EditSellerProfile(props) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [sellerId, setUserId] = React.useState(localStorage.getItem("sellerId"));

  let defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    companyName: "",
    password: "",
  };

  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    companyName: "",
  });

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/sellerprofile/'${sellerId}'`).then((res) => {
        setValues(res.data[0]);
        // console.log("data", res);
      });
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  // generate unique seller id...
  const handleAdd = async () => {
    // console.log(values);
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      companyName: "",
    };

    let flag = true;
    if (values.firstName === "") {
      newErrors["firstName"] = "error";
      flag = false;
    }

    if (values.lastName === "") {
      newErrors["lastName"] = "error";
      flag = false;
    }

    if (values.email === "") {
      newErrors["email"] = "error";
      flag = false;
    }

    if (values.address === "") {
      newErrors["address"] = "error";
      flag = false;
    }

    if (values.phoneNumber === "" || values.phoneNumber.length > 10) {
      newErrors["phoneNumber"] = "error";
      flag = false;
    }

    if (values.companyName === "") {
      newErrors["companyName"] = "error";
      flag = false;
    }

    if (values.password.length < 7) {
      newErrors["password"] = "error";
      flag = false;
    }

    setErrors(newErrors);
    if(flag === true){
      values.numberOfOrders = 0;
      await axios.post(`http://localhost:3308/seller/editprofile/${sellerId}`, values).then((res) => {
        console.log("hi", res);
        if (res.data.length !== 0) {
          setAlertOpen(true);
        }
      });
      
    }
  };

  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity="success"
          color="info"
        >
          Profile Updated Successfully...
        </Alert>
      </Collapse>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
              <InputLabel>First Name</InputLabel>
              <Input
                id="firstName"
                error={errors.firstName}
                value={values.firstName}
                onChange={handleChange}
                // startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
              <InputLabel>Last Name</InputLabel>
              <Input
                id="lastName"
                error={errors.lastName}
                value={values.lastName}
                onChange={handleChange}
                // startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
            </FormControl>
          </Stack>

          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Email</InputLabel>
            <Input
              id="email"
              type="email"
              error={errors.email}
              value={values.email}
              onChange={handleChange}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Address</InputLabel>
            <Input
              id="address"
              error={errors.address}
              value={values.address}
              onChange={handleChange}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>

          <Stack direction="row" spacing={2}>
            <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
              <InputLabel>Phone Number</InputLabel>
              <Input
                id="phoneNumber"
                type="numeric"
                error={errors.phoneNumber}
                value={values.phoneNumber}
                onChange={handleChange}
                // startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
              <InputLabel>Company Name</InputLabel>
              <Input
                id="companyName"
                error={errors.companyName}
                value={values.companyName}
                onChange={handleChange}
                // startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
            </FormControl>
          </Stack>

        </CardContent>
      </Card>

      <Stack sx={{ mt: 3 }} justifyContent="center" direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}
