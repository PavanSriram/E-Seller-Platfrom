import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ItemCard from "./ItemCard";
import CategoryDropdown from "./CategoryDropdown";
import Box from "@mui/material/Box";
import { useState } from "react";
import Category from "./Category";
import SearchBy from "../seller/searchBy";
import { Stack, TextField, Button, SvgIcon, InputAdornment, Checkbox } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { createSvgIcon } from "@mui/material/utils";
import FormControlLabel from "@mui/material/FormControlLabel";

import axios from "axios";

// import Deposits from "./Deposits";
// import Orders from "./Orders";

const Search = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>,
  "Search"
);

function Home(props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = React.useState("productName");
  const [searchText, setSearchText] = React.useState();
  const [searchedText, setSearchedText] = React.useState('');
  const [headCells, setHeadCells] = React.useState([]);

  const [flag, setFlag] = React.useState(false);

  const handleSearchBy = (searchby) => {
    if (searchby) setSearchBy(searchby);
  };

  const handleSearchText = (event) =>{
    setSearchText(event.target.value);
  }
  const handleSearch = async (event) =>{
    console.log("text", searchText);
    setSearchedText(searchText);
    // if(searchText.length !== 0){
    //   // await axios.get(`http://localhost:3308/allproducts/search/${sellerId}/${searchBy}/${searchText}`).then((res) => {
    //     // setProducts(res.data);
    //     // console.log("data1", res);
    //   // });
    // }
    // else{
    //   // await axios.get(`http://localhost:3308/allproducts/'${sellerId}'`).then((res) => {
    //     // setProducts(res.data);
    //     // console.log("data2", res);
    //   // });
    // }
    
  }

  // const [data, setData] = useState([{}]);

  // const fetchData =

  // useEffect(() => {
  //   async function fetchDataFashion() {
  //     await axios.get("http://localhost:3308/fashion").then((res) => {
  //       setData((data) => [...data, res.data]);
  //     });
  //   }
  //   async function fetchDataElectronics() {
  //     await axios.get("http://localhost:3308/electronics").then((res) => {
  //       setData((data) => [...data, res.data]);
  //     });
  //   }
  //   async function fetchDataSports() {
  //     await axios.get("http://localhost:3308/sports").then((res) => {
  //       setData((data) => [...data, res.data]);
  //     });
  //   }

  //   fetchDataFashion();
  //   fetchDataElectronics();
  //   fetchDataSports();
  // }, []);

  const handleSortByPrice = (event) => {
    setFlag(!flag);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      {/* <SearchBar setSearchValue = {() => {setSearchValue()}} /> */}
      <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ mt: 5, mb: 3, display: "flex" }}>
            {/* <Card>
              <CardContent> */}
            <Stack direction={"row"}>
              <Box sx={{ maxWidth: 800, minWidth: 400 }}>
                <TextField
                  fullWidth
                  size="small"
                  className="searchBar"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button color="primary" onClick={handleSearch}>
                          <SvgIcon fontSize="small" color="action">
                            <Search />
                          </SvgIcon>
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearchText}
                  placeholder={searchBy}
                  variant="standard"
                />
                
              </Box>
              {/* <Box sx={{ ml: 2 }}>
                <SearchBy
                  searchBy={searchBy}
                  handleSearchBy={handleSearchBy}
                  searchList={headCells}
                />
              </Box> */}
            </Stack>
            {/* </CardContent>
            </Card> */}
            <FormControlLabel control={<Checkbox onChange={() => {handleSortByPrice()}}/>} label="Sort By Price" />
          </Box>
        </Toolbar>
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
          {/* <CategoryDropdown />
          <CategoryDropdown />
          <CategoryDropdown /> */}
        </Box>
      </Container>

      <Container>
        {/* <h2 style={{marginLeft: "25px"}}>Fashion</h2> */}
        <Category category="fashion" user={props.user} searchText = {searchedText} flag={flag}/>
        {/* <h2 style={{marginLeft: "25px"}}>Electronics</h2> */}
        <Category category="electronics" user={props.user} searchText = {searchedText} flag={flag}/>
        {/* <h2 style={{marginLeft: "25px"}}>Sports</h2> */}
        <Category category="sports" user={props.user} searchText = {searchedText} flag={flag}/>
        {/* <h2 style={{marginLeft: "25px"}}>Vehicles</h2> */}
        <Category category="vehicles" user={props.user} searchText = {searchedText} flag={flag}/>
        {/* <h2 style={{marginLeft: "25px"}}>Books</h2> */}
        <Category category="books" user={props.user} searchText = {searchedText} flag={flag}/>
        {/* <h2 style={{marginLeft: "25px"}}>Others</h2> */}
        <Category category="others" user={props.user} searchText = {searchedText} flag={flag}/>
        
      </Container>
        {/* {props.user} */}
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
