import React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartItem(props) {

  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // console.log(props.child.productName);
    // let request = { productName: props.child.productName, brand: props.child.brand, sellerId: props.child.sellerId };
    // console.log(request);
  //   // console.log("Hello");
    async function fetchData() {
      await axios
        .get(`http://localhost:3308/getimage/${props.child.sellerId}/${props.child.brand}/${props.child.productName}`)
        .then((res) => {
          console.log(image);
          console.log(res.data);
          setImage(res.data.images);
          // props.fetchCartData(cartItems);
          // console.log("Hello" + cartItems);
          console.log(image);
        });
    }
    fetchData();
  }, [props]);

  const handleRemove = async () => {
    let request = {
      sellerId: props.child.sellerId,
      productName: props.child.productName,
      brand: props.child.brand,
      price: props.child.price,
      discountId: props.child.discountId,
    };

    await axios.put(`http://localhost:3308/removeFromCart/${props.user}`, request).then((res) => {
    //   console.log("HELLLO!!!");
    
        props.fetchCartData();
      console.log(res);
    });
  }

  return (
    <Grid item xs={12} md={12} lg={12} spacing={3} sx={{display: "flex", backgroundColor: "white"}}>
      {/* <Card sx={{ maxWidth: "auto" }}> */}
        <Grid container >
          <Grid item xs={4}>
          <img src={`${image}`} height="230" width="200"/>
          </Grid>
          <Grid item xs={8} sx={{display: "flex flex-col", justifyContent: "center", alignItems: "center", position: "relative"}}>
          <div style={{position: "absolute", justifyContent: "center", alignItems: "center", transform: "translate(50%, 50%)"}}>
          <Typography gutterBottom variant="h5" component="div">
            {props.child.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {props.child.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount: {props.child.discountId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {props.child.quantity}
          </Typography>
          <div className="flex-row">
            <Button size="small" >More</Button>
            <Button size="small" onClick={handleRemove}>Remove</Button>
          </div>
          </div>

          
          
          
          </Grid>
        </Grid>
    {/* </Card> */}
    </Grid>
  );
}

export default CartItem;
