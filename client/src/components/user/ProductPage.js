import { Container, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

function ProductPage(props) {

  const location = useLocation();

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={20} justifyContent="center" alignItems="center">
        <Grid item xs={4} >
          <img src={`${location.state.image}`} />
        </Grid>
        <Grid item xs={8} >
          <h1>{location.state.item.child.productName}</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage;
