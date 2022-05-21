import { Container, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

function ProductPage(props) {

  const location = useLocation();

  return (
    <Container maxWidth="false" sx={{ display: "flex", mt: 2, mb: 2, backgroundColor: "white", width: "100%", height: "86vh" }}>
      <Grid container spacing={2} sx={{display: "flex", justifyContent: "center"}}>
        <Grid item xs={4} sx={{display: "flex", justifyContent: "center", alignItems: "center", padding: "0px"}} >
          <img src={`${location.state.image}`} />
        </Grid>
        <Grid item xs={8} sx={{display: "flex flex-row", justifyContent: "center"}} >
          <Grid item xs={12} >
            <h1> {location.state.item.child.title} </h1>
          </Grid>
          <Grid sx={{display: "flex flex-row", justifyContent: "center", alignItems: "center"}}>
            <h3> Product Name: {location.state.item.child.productName} </h3>
            <h3> Brand: {location.state.item.child.brand} </h3>
            <h3> Price: {location.state.item.child.price} </h3>
            {location.state.item.child.productName > 0 ? <h3>In Stock</h3> : <h3>Out of Stock</h3>}
            <h3> Discount: {location.state.item.child.discountId} </h3>
            <h3> Description: {location.state.item.child.description} </h3>
            <h3> Dimensions: {location.state.item.child.dimensions} inches </h3>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage;
