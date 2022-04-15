import { Container } from "@mui/material";
import React, { useState } from "react";
import ItemCard from "./ItemCard";
import  { Grid } from "@mui/material";   
import CategoryDropdown from "./CategoryDropdown";
import Box from "@mui/material/Box";

function Category() {
  const [products, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Container
            sx={{
              display: "flex",
              mb: 2,
              // marginLeft: "10vw",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <Box
              sx={{
                display: "flex",
                // marginTop: "10px",
                marginLeft: "7.5vw",
                justifyItems: "center",
                alignItems: "center",
                // backgroundColor: "blue",
              }}
            >
              <CategoryDropdown />
              <CategoryDropdown />
              <CategoryDropdown />
              <CategoryDropdown />
              <CategoryDropdown />
            </Box>
          </Container>
      <Grid container spacing={3}>
        {products.map((item) => (
          <ItemCard child={item} />
        ))}
      </Grid>
    </Container>
  );
}

export default Category;
