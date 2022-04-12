import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Card, CardContent, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function AddProduct() {
  const [values, setValues] = React.useState({
    productName: "",
    brand: "",
    title: "",
    category: "A",
    subCategory: "B",
    description: "",
    price: "",
    count: "",
    discountId: "",
  });

  const categories = ["A", "B", "C", "D", "E"];
  const subCategories = ["A", "B", "C", "D", "E"];

  const handleChangeCategory = (event) => {
    setValues({ ...values, ["category"]: event.target.value });
    console.log(values);
  };

  const handleChangeSubCategory = (event) => {
    setValues({ ...values, ["subCategory"]: event.target.value });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box sx={{ justifyContent: "center", mt: 8, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Product Name</InputLabel>
            <Input
              id="productName"
              value={values.productName}
              onChange={handleChange("productName")}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Brand</InputLabel>
            <Input
              id="brand"
              value={values.brand}
              onChange={handleChange("brand")}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Title</InputLabel>
            <Input
              id="title"
              value={values.title}
              onChange={handleChange("title")}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <Stack direction="row">
            <TextField
              id="category"
              select
              sx={{ m: 1, mt: 2}}
              fullWidth
              label="Select Category"
              value={values.category}
              onChange={handleChangeCategory}
              //   helperText="Please select your currency"
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ m: 1, ml: 2, mt: 2 }}
              id="category"
              select
              fullWidth
              label="Select Sub Category"
              value={values.subCategory}
              onChange={handleChangeSubCategory}
              //   helperText="Please select your currency"
            >
              {subCategories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row">
            <TextField
              label="Price"
              id="standard-start-adornment"
              sx={{ m: 1, mt: 2}}
              fullWidth
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">&#x20B9;</InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              label="Count"
              id="standard-start-adornment"
              sx={{ m: 1, mt: 2}}
              type="number"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
