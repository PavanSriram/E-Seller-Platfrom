import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(
  step,
  callBack,
  callBackPayment,
  address,
  payment,
  setCartItems,
  setTotalAmount
) {
  switch (step) {
    case 0:
      return <AddressForm callBack={callBack} />;
    case 1:
      return <PaymentForm callBack={callBackPayment} />;
    case 2:
      return (
        <Review
          address={address}
          payment={payment}
          callBackCart={setCartItems}
          callBackAmount={setTotalAmount}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  let defaultAddressValues = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
  };
  let defaultPaymentValues = {
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  };

  const [address, setAddress] = React.useState(defaultAddressValues);
  const [payment, setPayment] = React.useState(defaultPaymentValues);
  const [cartItems, setCartItems] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [paymentId, setPaymentId] = React.useState(0);

  let callBack = setAddress;

  // eslint-disable-next-line no-extend-native
  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
  };

  const handleOrder = async () => {
    let userId = localStorage.getItem("userId");

    let date = new Date();
    let deliveryDate = date;
    deliveryDate.addDays(4);
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];

      let request = {
        pid: item.pid,
        sellerId: item.sellerId,
        quantity: item.quantity,
        userId: userId,
        orderDate:
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear(),
        status: "Pending",
        deliveryDate:
          deliveryDate.getDate() +
          4 +
          "-" +
          (deliveryDate.getMonth() + 1) +
          "-" +
          deliveryDate.getFullYear(),
        actualDeliveryDate: "",
        amount: totalAmount,
        paymentMode: "Debit Card",
        paymentStatus: "Completed",
      };

      await axios
        .post("http://localhost:3308/user/payment", request)
        .then(function (response) {
          if(response === "Insufficient quantity"){
            alert("Insufficient quantity for the product " + item.name);
            return false;
          }
          console.log(response);
          // setPaymentId(response.d);
          let removeRequest = {
            pid: item.pid,
          };

          axios
            .put(`http://localhost:3308/removeFromCart/${userId}`, removeRequest)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
              return false;
            });
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (address.firstName === "") {
        alert("Please enter your first name");
        return;
      }
      if (address.lastName === "") {
        alert("Please enter your last name");
        return;
      }
      if (address.address1 === "") {
        alert("Please enter your address");
        return;
      }
      if (address.city === "") {
        alert("Please enter your city");
        return;
      }
      if (address.postal === "") {
        alert("Please enter your postal code");
        return;
      }
      if (address.country === "") {
        alert("Please enter your country");
        return;
      }
    }
    if (activeStep === 1) {
      // console.log(payment.cardName);
      if (payment.cardName === "") {
        alert("Please enter your name");
        return;
      }
      if (payment.cardNumber === "") {
        alert("Please enter your card number");
        return;
      }
      if (payment.expDate === "") {
        alert("Please enter your expiry date");
        return;
      }
      if (payment.cvv === "") {
        alert("Please enter your cvv");
        return;
      }
    }

    setActiveStep(activeStep + 1);
    // if(activeStep === 0){
    //   callBack = setPayment;
    // }

    if (activeStep == steps.length - 1) {
      
      if(handleOrder())
      {
        alert("Order placed successfully");
      }
      else{
        alert("Oops, cannot place order right now");
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    // if(activeStep === 1){
    //   callBack = setAddress;
    // }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  callBack,
                  setPayment,
                  address,
                  payment,
                  setCartItems,
                  setTotalAmount
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
