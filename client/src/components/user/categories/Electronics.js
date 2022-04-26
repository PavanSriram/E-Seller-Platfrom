import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import ItemCard from "../ItemCard";
import  { Grid } from "@mui/material";
import { Container } from "@mui/material";

const Electronics = () => {

  const [electronicProducts, setElectronicProducts] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3306/electronics`).then((res) => {
        setElectronicProducts(res.data);
        console.log(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      
      <Grid container spacing={3}>
        {electronicProducts.map((item) => (
          <ItemCard child={item} />
        ))}
      </Grid>
    </Container>
  )
}

export default Electronics