import { Container } from "@mui/material";
import React, { useState } from "react";
import ItemCard from "./ItemCard";
import  { Grid } from "@mui/material";   
import CategoryDropdown from "./CategoryDropdown";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect } from "react";

function Category(props) {
  let key = 0;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/${props.category}`).then((res) => {
        setProducts(res.data);
        // console.log(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      
      <Grid container spacing={3}>
        {products.map((item) => (
          <ItemCard key={key++} child={item} />
        ))}
      </Grid>
    </Container>
  );
}

export default Category;
