import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import ItemCard from "../ItemCard";
import  { Grid } from "@mui/material";
import { Container } from "@mui/material";

const Fashion = () => {

  const [fashionProducts, setFashionProducts] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3306/fashion`).then((res) => {
        setFashionProducts(res.data);
        console.log(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      
      <Grid container spacing={3}>
        {fashionProducts.map((item) => (
          <ItemCard child={item} />
        ))}
      </Grid>
    </Container>
  )
}

export default Fashion