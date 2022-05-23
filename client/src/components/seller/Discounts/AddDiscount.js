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
import axios from "axios";

export default function AddDiscount(props) {
  const [sellerId, setUserId] = React.useState(localStorage.getItem("sellerId"));

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertOpenError, setAlertOpenError] = React.useState(false);
  let defaultValues = {
    discountId: "",
    expiryDate: "",
    percent: "",
  };

  if (!props) {
    defaultValues = [...props];
  }
  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({
    discountId: "",
    expiryDate: "",
    percent: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  // handle error for duplicate products
  const handleAdd = async () => {
    // console.log(values);
    let newErrors = {
        discountId: "",
        expiryDate: "",
        percent: "",
    };

    let flag = true;

    if (values.expiryDate === "") {
      newErrors["expiryDate"] = "error";
      flag = false;
    }

    if (values.percent === "" || values.percent[0] === "-" || parseFloat(values.percent) >= 100) {
      newErrors["percent"] = "error";
      flag = false;
    }

    setErrors(newErrors);
    if(flag === true){
      values.numberOfOrders = 0;
      await axios.post(`http://localhost:3308/seller/addDiscount/${sellerId}`, values).then((res) => {
        console.log("hi", res);
        if (res.data.length !== 0) {
          setValues(defaultValues);
          setAlertOpen(true);
        } else {
          setAlertOpenError(true);
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
          New Discount Added Successfully...
        </Alert>
      </Collapse>
      
      <Collapse in={alertOpenError}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpenError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity="error"
          color="error"
        >
          Error: Duplicate Discount...!
        </Alert>
      </Collapse>
      <Card>
        <CardContent>

          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Expiry Date</InputLabel>
            <Input
              id="expiryDate"
              type="Date"
              error={errors.expiryDate}
              value={values.expiryDate}
              onChange={handleChange}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Percent</InputLabel>
            <Input
              id="percent"
              error={errors.percent}
              value={values.percent}
              onChange={handleChange}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
        </CardContent>
      </Card>

      <Stack sx={{ mt: 1 }} justifyContent="center" direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          ADD
        </Button>
      </Stack>
    </Box>
  );
}
