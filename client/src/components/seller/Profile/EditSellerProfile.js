import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import EditIcon from "@mui/icons-material/Edit";

export default function EditSellerProfile(props) {
  let defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    // sellerId: "",
    phoneNumber: "",
    companyName: "",
    password: "",
  };

  if (!props) {
    defaultValues = [...props];
  }
  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    // sellerId: "",
    phoneNumber: "",
    companyName: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  // generate unique seller id...
  const handleAdd = () => {
    // console.log(values);
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      // sellerId: "",
      phoneNumber: "",
      companyName: "",
    };

    if (values.firstName === "") {
      newErrors["firstName"] = "error";
    }

    if (values.lastName === "") {
      newErrors["lastName"] = "error";
    }

    if (values.email === "") {
      newErrors["email"] = "error";
    }

    if (values.address === "") {
      newErrors["address"] = "error";
    }

    if (values.phoneNumber === "" || values.phoneNumber.length() > 10) {
      newErrors["phoneNumber"] = "error";
    }

    if (values.companyName === "") {
      newErrors["companyName"] = "error";
    }

    if (values.password.length < 7) {
      newErrors["password"] = "error";
    }

    setErrors(newErrors);
  };

  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
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
