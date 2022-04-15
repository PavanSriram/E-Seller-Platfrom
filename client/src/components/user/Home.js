import React from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ItemCard from "./ItemCard";
import CategoryDropdown from './CategoryDropdown';
import Box from '@mui/material/Box';
import { useState } from 'react';

// import Deposits from "./Deposits";
// import Orders from "./Orders";

function Home() {
    const [data, setData] = useState([1, 2, 3, 4, 5, 6]);


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
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        ></Paper>
      </Grid>
      {/* Recent Deposits */}
      
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {/* <Deposits /> */}
        </Paper>
      </Grid>
      {/* Recent Orders */}
      {/* <Grid item xs={12} md={4} lg={3} spacing={3}> */}
        {data.map((item) => <ItemCard child={item}/>)}
      {/* </Grid> */}
    </Grid>
    {/* <Copyright sx={{ pt: 4 }} /> */}
  </Container>
  )
}

export default Home