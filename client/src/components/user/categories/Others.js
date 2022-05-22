import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import ItemCard from "../ItemCard";
import  { Grid } from "@mui/material";
import { Container } from "@mui/material";

const Others = () => {

  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/others`).then((res) => {
        setOtherProducts(res.data);
        console.log(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      
      <Grid container spacing={3}>
        {otherProducts.map((item) => (
          <ItemCard child={item} />
        ))}
      </Grid>
    </Container>
  )
}

export default Others;