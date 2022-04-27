import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useNavigate } from "react-router";

const theme = createTheme();

export default function UserRegister(props) {
  // sign in successfull snackbar at bottom
  const navigate = useNavigate();

  const [snackOpen, setSnackOpen] = React.useState(false);

  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  let defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  };

  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const gotoSignIn = () => {
    navigate("/user/signin");
    };

  // generate unique seller id
  const handleRegister = async () => {
    console.log(values);
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      password: "",
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

    if (values.phoneNumber === "" || values.phoneNumber.length !== 10) {
      newErrors["phoneNumber"] = "error";
      flag = false;
    }

    if (values.password.length < 7) {
      newErrors["password"] = "error";
      flag = false;
    }

    setErrors(newErrors);
    if (flag === true) {
      await axios
        .post("http://localhost:3308/user/register", values)
        .then((res) => {
            console.log(res);
          if (res.data !== '') {
            setAlertOpen(true);
            setValues(defaultValues);
            gotoSignIn();
          } else {
            setAlertOpen(true);
          }
        });
      setAlertOpen(true);
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="firstName"
                  label="First Name"
                  error={errors.firstName}
                  value={values.firstName}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  error={errors.lastName}
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email Address"
                  error={errors.email}
                  value={values.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  type="password"
                  id="password"
                  error={errors.password}
                  value={values.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="phoneNumber"
                  label="Phone Number"
                  error={errors.phoneNumber}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="address"
                  label="Address"
                  error={errors.address}
                  value={values.address}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Snackbar
              open={snackOpen}
              autoHideDuration={6000}
              onClose={handleSnackClose}
            >
              <Alert
                onClose={handleSnackClose}
                severity="info"
                sx={{ width: "100%" }}
              >
                You are registered successfully...!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
