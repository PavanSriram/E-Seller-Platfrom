import { Container } from "@mui/material";
import React, { useState } from "react";
import ItemCard from "./ItemCard";
import  { Grid } from "@mui/material";   

function Category() {
  const [products, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {products.map((item) => (
          <ItemCard child={item} />
        ))}
      </Grid>
    </Container>
  );
}

export default Category;
