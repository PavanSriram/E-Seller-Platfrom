import { Container, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ProductPage(props) {

  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = React.useState(0);

  let user = localStorage.getItem("userId");

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = async () => {
    console.log(quantity);
    let request = {
      sellerId: location.state.item.child.sellerId,
      productName: location.state.item.child.productName,
      brand: location.state.item.child.brand,
      price: location.state.item.child.price,
      quantity: quantity,
      discountId: location.state.item.child.discountId,
    };

    if(quantity > 0) {
      await axios.put(`http://localhost:3308/addToCart/${user}`, request).then((res) => {
        console.log("HELLLO!!!");
        console.log(res);
      });
    }
    else{
      alert("Please enter a valid quantity");
    }
  }

  const handleRemove = async () => {
    let request = {
      sellerId: location.state.item.child.sellerId,
      productName: location.state.item.child.productName,
      brand: location.state.item.child.brand,
      price: location.state.item.child.price,
      discountId: location.state.item.child.discountId,
    };

    await axios.put(`http://localhost:3308/removeFromCart/${user}`, request).then((res) => {
    //   console.log("HELLLO!!!");
        console.log(res);
    });
  }

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        mt: 2,
        mb: 2,
        backgroundColor: "white",
        width: "100%",
        height: "86vh",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
          }}
        >
          <img src={`${location.state.image}`} maxHeight="500" height="400" width="400"/>
        </Grid>
        <Grid item xs={8} sx={{ margin: "auto", width: "100%" }}>
          {/* <h1 style={{display: "flex", justifyContent: "center"}}> {location.state.item.child.title} </h1> */}
          <h4> Product Name: {location.state.item.child.productName} </h4>
          <h4> Brand: {location.state.item.child.brand} </h4>
          <h4> Price: {location.state.item.child.price} </h4>
          {parseInt(location.state.item.child.quantity) > 0 ? (
            <h4>In Stock</h4>
          ) : (
            <h4>Out of Stock</h4>
          )}
          <h4> Discount: {location.state.item.child.discountId}0% </h4>
          <h4> Description: {location.state.item.child.description} </h4>
          <h4> Dimensions: {location.state.item.child.dimensions} inches </h4>
          <CardActions>
          <Button variant="contained" onClick={handleAddToCart} sx={{backgroundColor: "#2558F9", color: "white", paddingLeft: "20px", paddingRight: "20px"}}>
              Add to Cart
            </Button>
            <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quantity}
          onChange={handleQuantityChange}
          label="Quantity"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
          <Button variant="contained" onClick={handleRemove} sx={{backgroundColor: "#2558F9", color: "white", paddingLeft: "20px", paddingRight: "20px"}} >Remove</Button>
            
          </CardActions>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage;
