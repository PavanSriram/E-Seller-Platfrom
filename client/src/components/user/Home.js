import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ItemCard from "./ItemCard";
import CategoryDropdown from "./CategoryDropdown";
import Box from "@mui/material/Box";
import { useState } from "react";
import Category from "./Category";

import axios from "axios";

// import Deposits from "./Deposits";
// import Orders from "./Orders";

function Home(props) {
  // const [data, setData] = useState([{}]);

  // const fetchData =

  // useEffect(() => {
  //   async function fetchDataFashion() {
  //     await axios.get("http://localhost:3306/fashion").then((res) => {
  //       setData((data) => [...data, res.data]);
  //     });
  //   }
  //   async function fetchDataElectronics() {
  //     await axios.get("http://localhost:3306/electronics").then((res) => {
  //       setData((data) => [...data, res.data]);
  //     });
  //   }
  //   async function fetchDataSports() {
  //     await axios.get("http://localhost:3306/sports").then((res) => {
  //       setData((data) => [...data, res.data]);
  //     });
  //   }

  //   fetchDataFashion();
  //   fetchDataElectronics();
  //   fetchDataSports();
  // }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Container
        sx={{
          display: "flex",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            margin: "0 auto",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <CategoryDropdown />
          <CategoryDropdown />
          <CategoryDropdown />
        </Box>
      </Container>

      <Container>
      <Category category="fashion" />
        <Category category="electronics" />
        {/* <Category category="sports" /> */}
      </Container>
        {props.user}
      {/* <Category category="electronics"/>
      <Category category="sports"/> */}

      {/*       
        {data.map((item) => (
          <ItemCard child={item} />
        ))} */}
    </Container>
  );
}

export default Home;
