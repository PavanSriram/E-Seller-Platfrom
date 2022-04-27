import * as React from "react";
import { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router";

export default function EditSellerProfile(props) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const [alertOpen, setAlertOpen] = React.useState(false);

  let defaultValues = {
    userId: localStorage.getItem("userId"),
    address: "",
    phoneNumber: "",
    newPassword: "",
  };

  if (!props) {
    defaultValues = [...props];
  }
  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({
    address: "",
    phoneNumber: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  // generate unique seller id...
  const handleSave = async () => {
    // console.log(values);
    let flag = true;

    let newErrors = {
      address: "",
      phoneNumber: "",
      newPassword: "",
    };

    if (values.address === "") {
      newErrors["address"] = "error";
      flag = false;
    }

    if (values.phoneNumber === "" || values.phoneNumber.length > 10) {
      newErrors["phoneNumber"] = "error";
      flag = false;
    }

    if (values.newPassword.length < 7) {
      newErrors["newPassword"] = "error";
      flag = false;
    }

    setErrors(newErrors);

    // console.log(values);
    if (flag) {
      // console.log(values);
      await axios
        .post("http://localhost:3308/user/update", values)
        .then((res) => {
          if (res.data !== "") {
            setAlertOpen(true);
            setValues(defaultValues);
            navigate("/user/profile");
          } else {
            setAlertOpen(true);
          }
        });
    }
  };

  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
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
              <InputLabel>New Password</InputLabel>
              <Input
                id="newPassword"
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}
