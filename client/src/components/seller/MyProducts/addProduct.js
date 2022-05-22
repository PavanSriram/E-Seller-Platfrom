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
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import buyImage from "./defaultImage.png"

export default function AddProduct(props) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertOpenError, setAlertOpenError] = React.useState(false);
  const categories = ["Electronics", "Fashion", "Sports", "Vehicles", "Books", "Other"];
  const subCategories = {
    "Electronics":  ["Mobiles and Computers", "Televisions", "Audio", "Cameras", "Air Conditioners", "Refrigerators", "Washing Machines", "Home and Kitchen Applainces", "Other"],
    "Fashion": ["Men's Clothing", "Women's Clothing", "Shoes", "Watches", "Bags and Luggage", "Jwellery", "Other"],
    "Sports": ["Sports Accessories", "Yoga", "Fitness Accessories", "Cardio equipment", "Other"],
    "Vehicles": ["Car Accessories", "Car Parts", "Bike Care", "Cycles", "Other"],
    "Books": ["Fiction", "Adventure", "Children's Books", "School Textbooks", "Language"],
    "Other": ["Other"]
  };
  let defaultValues = {
    sellerId: props.sellerId,
    productName: "",
    brand: "",
    title: "",
    description: "",
    category: categories[0],
    subCategory: subCategories[categories[0]][0],
    price: "",
    quantity: "",
    discountId: "",
    dimensions: "",
    numberOfOrders: 0,
    images: []
  };

  
  
  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({
    productName: "",
    brand: "",
    title: "",
    description: "",
    price: "",
    quantity: "",
    discountId: "",
    dimensions: "",
  });

  
  const [category, setCategory] = React.useState(categories[0]);
  const [subCategory, setSubCategory] = React.useState(subCategories[categories[0]][0]);

  const handleCategoryDropdown = async (event) => {
    setCategory(event.target.value);
    setSubCategory(subCategories[event.target.value][0]);
    setValues({ ...values, ["subCategory"]: subCategories[event.target.value][0], ["category"]: event.target.value });
  }
  const handleSubCategoryDropdown = (event) => {
    setSubCategory(event.target.value);
    setValues({ ...values, ["subCategory"]: event.target.value });
  }
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const handleAdd = async () => {
    let newErrors = {
      productName: "",
      brand: "",
      title: "",
      description: "",
      price: "",
      quantity: "",
      // if discount Id is added check if it is present in discounts table, else print error
      discountId: "",
      dimensions: "",
    };

    let flag = true;
    if (values.productName === "") {
      newErrors["productName"] = "error";
      flag = false;
    }

    if (values.brand === "") {
      newErrors["brand"] = "error";
      flag = false;
    }

    if (values.title === "") {
      newErrors["title"] = "error";
      flag = false;
    }

    if (values.price === "" || values.price[0] === "-") {
      newErrors["price"] = "error";
      flag = false;
    }

    if (values.quantity === "" || !/^\d+$/.test(values.quantity)) {
      newErrors["quantity"] = "error";
      flag = false;
    }

    setErrors(newErrors);
    let pid_;
    if(flag === true){
      values.numberOfOrders = 0;
      await axios.post("http://localhost:3308/seller/addProduct", values).then((res) => {
        console.log("hi", res);
        if (res.data.length !== 0) {
          setValues(defaultValues);
          setAlertOpen(true);
        } else {
          setAlertOpenError(true);
        }
      });
    }
    if(flag === true){
      await axios.post(`http://localhost:3308/addimage`, values).then((res) => {
        // console.log("hi", res);
        if (res.data.length !== 0) {
          setValues(defaultValues);
          setAlertOpen(true);
        } else {
          setAlertOpenError(true);
        }
      });
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  };

  const handleImage = async (e) => {
    console.log(e.target.files);
    const img = await convertBase64(e.target.files[0]); 
    const a = JSON.parse(JSON.stringify(values));
    a.images.push(img);
    setValues(a);
  }

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
          Product Added Successfully...
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
          Error: Duplicate Product...!
        </Alert>
      </Collapse>
      <Card>
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Product Name</InputLabel>
            <Input
              id="productName"
              error={errors.productName}
              value={values.productName}
              onChange={handleChange}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Brand</InputLabel>
            <Input
              id="brand"
              error={errors.brand}
              value={values.brand}
              onChange={handleChange}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
            <InputLabel>Title</InputLabel>
            <Input
              id="title"
              error={errors.title}
              value={values.title}
              onChange={handleChange}
              // startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>

          <Stack direction="row">
            <TextField
              id="category"
              select
              sx={{ m: 1, mt: 2 }}
              fullWidth
              error={errors.category}
              label="Select Category"
              value={category}
              onChange={handleCategoryDropdown}
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
              id="subCategory"
              select
              fullWidth
              error={errors.subCategory}
              label="Select Sub Category"
              value={subCategory}
              onChange={handleSubCategoryDropdown}
            >
              {subCategories[category].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction="row">
            <TextField
              label="Price"
              id="price"
              sx={{ m: 1, mt: 2 }}
              fullWidth
              error={errors.price}
              type="number"
              value={values.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">&#x20B9;</InputAdornment>
                ),
              }}
              variant="standard"
            />

            <TextField
              label="Quantity"
              id="quantity"
              sx={{ m: 1, mt: 2 }}
              type="number"
              fullWidth
              error={errors.quantity}
              value={values.quantity}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Stack>

          <Stack direction="row">
            <TextField
              label="Discount ID"
              id="discountId"
              sx={{ m: 1, mt: 2 }}
              fullWidth
              error={errors.discountId}
              type="text"
              value={values.discountId}
              onChange={handleChange}
              variant="standard"
            />

            <TextField
              label="Dimensions"
              id="dimensions"
              sx={{ m: 1, mt: 2 }}
              type="text"
              fullWidth
              error={errors.dimensions}
              value={values.dimensions}
              onChange={handleChange}
              variant="standard"
            />
          </Stack>

          <TextField
            id="description"
            label="Description"
            sx={{ ml: 1, mr: 1, mt: 2, whiteSpace: "pre-line" }}
            fullWidth
            multiline
            error={errors.description}
            rows={4}
            value={values.description}
            onChange={handleChange}
            // defaultValue=""
          />

          <Box sx={{ ml: 1, mr: 1, mt: 2, whiteSpace: "pre-line" }}>
            <label for="addImage" className="form-label labels">
              Add Images of your Add
            </label>
            <div className="input-group mb-3">
              <input type="file" name="ImageInput" className={"form-control"} id="inputImageFile" onChange={(e) => {handleImage(e);}} required />
            </div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {
                  values.images.map((img) => <div className="carousel-item">
                  <img src={img} className="d-block w-100"/>
                </div>)}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon carIcon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon carIcon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            </Box>
        </CardContent>
      </Card>

      <Stack sx={{ mt: 1, mb: 2 }} justifyContent="center" direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          ADD
        </Button>
      </Stack>
    </Box>
  );
}