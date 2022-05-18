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
          setImage(res.data.image);
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
    <Grid item xs={12} md={4} lg={3} spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
      
      <img src={`${image}`} />

      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={URL.createObjectURL(`data:image/jpeg;base64,${image}`)}
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.child.productName}
          Product
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: 10000
          Discount: 10%
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" >More</Button>
        <Button size="small" onClick={handleRemove}>Remove</Button>
      </CardActions>
    </Card>
    </Grid>
  );
}

export default CartItem;
