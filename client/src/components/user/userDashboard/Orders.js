import { Container } from "@mui/material";
import React, { useState } from "react";
import ItemCard from "../ItemCard";
import  { Grid } from "@mui/material";   
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect } from "react";

function Orders(props) {
  const [myOrders, setMyOrders] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/user/orders`).then((res) => {
        setMyOrders(res.data);
        console.log(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      
      <Grid container spacing ={3}>
        {myOrders.map((item) => (
          <ItemCard child={item} />
        ))}
      </Grid>
    </Container>
  );
}

export default Orders;
