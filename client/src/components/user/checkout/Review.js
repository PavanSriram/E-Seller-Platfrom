import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Review(props) {

  const [total, setTotal] = useState(0);

  const [order, setOrder] = useState({});

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const [cartItems, setCartItems] = useState([]);

  async function fetchData() {
    let total = 0;
    await axios
      .get(`http://localhost:3308/usercart/${userId}`)
      .then((res) => {
        setCartItems(res.data.cart);
        props.callBackCart(res.data.cart);
        
        for(let i = 0; i < res.data.cart.length; i++){
          total += res.data.cart[i].quantity * parseFloat(res.data.cart[i].price);
        }
        setTotal(total);
        props.callBackAmount(total);
    });
  }

  useEffect(()  => {
    fetchData();
  }, [userId]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.productName} secondary={product.description} />
            <Typography variant="body2">{product.quantity}x{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.address.firstName}</Typography>
          <Typography gutterBottom>{props.address.lastName}</Typography>
          <Typography gutterBottom>{props.address.address1}</Typography>
          <Typography gutterBottom>{props.address.address2}</Typography>
          <Typography gutterBottom>{props.address.city}</Typography>
          <Typography gutterBottom>{props.address.state}</Typography>
          <Typography gutterBottom>{props.address.postal}</Typography>
          <Typography gutterBottom>{props.address.country}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container >
                <Grid item xs={12}>
                  <Typography gutterBottom> Name On Card: {props.payment.cardName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Card Number: {props.payment.cardNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Expiry Date: {props.payment.expDate}</Typography>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}