import React, { useEffect } from "react";
import { useState } from "react";
import ItemCard from "./ItemCard";
import { Paper, Grid, Container, Fab, Box } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useNavigate } from "react-router";
import axios from "axios";

const Cart = () => {

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const  navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   let request = {userId};
  //   async function fetchData() {
  //     await axios.post(`http://localhost:3306/user/cart`, request)
  //     .then((res) => {
  //       setCartItems(res.data);
  //       console.log(res.data);
  //     });
  //   }
  //   fetchData();
  // }, [userId]);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2, "& > :not(style)": { m: 1 } }}>
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <ItemCard child={item} />
          ))}
        </Grid>

        <Fab
        sx={{ position: "absolute", bottom: 50, right: 45 }}
        color="primary"
        variant="extended"
        aria-label="add"
        onClick={() => navigate("/user/checkout")}
      >
        <NavigationIcon sx={{ mr: 1 }} />
          Checkout
      </Fab>
    </Container>
  );
};

export default Cart;
