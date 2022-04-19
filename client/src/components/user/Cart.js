import React from "react";
import { useState } from "react";
import ItemCard from "./ItemCard";
import { Paper, Grid, Container, Fab, Box } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  
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
