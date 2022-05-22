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
import { useLocation } from "react-router";

export default function EditOrder(props) {
//   console.log("editProducts", useLocation().state.product);
  let location = useLocation();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertOpenError, setAlertOpenError] = React.useState(false);
  const statusTypes = ["processing", "shipped", "inTransit", "outForDelivery", "delivered"];
  
  let defaultValues = {
    status: statusTypes[0],
    deliveryDate: "",
    actualDeliveryDate: "",
  };
  
  
  const [values, setValues] = React.useState(location.state.order);
  const [errors, setErrors] = React.useState({
    deliveryDate: "",
    actualDeliveryDate: "",
  });

  
  const [status, setStatus] = React.useState(location.state.order.status);

  const handleStatusDropdown = (event) => {
    setStatus(event.target.value);
    setValues({ ...values, ["status"]: event.target.value });
  }
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };
   
  const handleAdd = async () => {
    let newErrors = {
        deliveryDate: "",
        actualDeliveryDate: "",
    };

    let flag = true;
    if (values.deliveryDate === "") { 
      newErrors["deliveryDate"] = "error";
      flag = false;
    }

    if (values.actualDeliveryDate === "") {
      newErrors["actualDeliveryDate"] = "error";
      flag = false;
    }


    setErrors(newErrors);
    if(flag === true){
      values.numberOfOrders = 0;
      await axios.post(`http://localhost:3308/seller/editorder/${location.state.order.orderId}`, values).then((res) => {
         
        if (res.data.length !== 0) {
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
          Order Updated Successfully...
        </Alert>
      </Collapse>
      <Card>
        <CardContent>

            <TextField
              id="status"
              select
              sx={{ m: 1, mt: 2 }}
              fullWidth
              error={errors.status}
              label="Select Status"
              value={status}
              onChange={handleStatusDropdown}
              //   helperText="Please select your currency"
            >
              {statusTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          
            <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
                <InputLabel>Delivery Date</InputLabel>
                <Input
                id="deliveryDate"
                type="Date"
                error={errors.deliveryDate}
                value={values.deliveryDate}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
                <InputLabel>Actual Delivery Date</InputLabel>
                <Input
                id="actualDeliveryDate"
                type="Date"
                error={errors.actualDeliveryDate}
                value={values.actualDeliveryDate}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
            </FormControl>
            
        </CardContent>
      </Card>

      <Stack sx={{ mt: 1 }} justifyContent="center" direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          CHANGE
        </Button>
      </Stack>
    </Box>
  );
}
