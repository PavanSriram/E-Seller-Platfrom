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
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router";


// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const theme = createTheme();

export default function UserSignIn(props) {
  // sign in successfull snackbar at bottom
  const navigate = useNavigate();
   
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    
    setSnackOpen(false);
  };

  // sign in not successfull snackbar at bottom
  const [snackOpenError, setSnackOpenError] = React.useState(false);
  const handleSnackCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpenError(false);
  };

  let defaultValues = {
    email: "",
    password: "",
  };

  // if (!props) {
  //   defaultValues = [...props];
  // }

  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const setUser = (id) => {
    props.setUser(id);
  }

  // generate unique seller id
  const handleSignIn = async () => {
    // console.log(values);
    let newErrors = {
      email: "",
      password: "",
    };

    let flag = true;

    if (values.email === "") {
      newErrors["email"] = "error";
      flag = false;
    }

    if (values.password === 0) {
      newErrors["password"] = "error";
        flag = false;
    }

    setErrors(newErrors);
    if (flag === true) {
        await axios
          .post("http://localhost:3308/user/signin", values)
          .then((res) => {
            if (res.data.length !== 0) {
              setValues(defaultValues);
              setUser(res.data[0].userId);
              localStorage.setItem("userId", res.data[0].userId);
              navigate("/user/dashboard");
              setSnackOpen(true);
            } 
            else {
              // console.log("res", res);
              setValues(defaultValues);
              setSnackOpenError(true);
            }
          });
        
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
            Sign In
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
            </Grid>

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
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
              Welcome Back...!
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackOpenError}
            autoHideDuration={6000}
            onClose={handleSnackCloseError}
          >
            <Alert
              onClose={handleSnackCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              Invalid email or password...!
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
