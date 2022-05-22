import React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

function ItemCard(props) {
  const navigate = useNavigate();

  const [image, setImage] = useState([]);

  useEffect(() => {
    // console.log(props.child.productName);
    // let request = { productName: props.child.productName, brand: props.child.brand, sellerId: props.child.sellerId };
    // console.log(request);
    //   // console.log("Hello");
    async function fetchData() {
      await axios
        .get(
          `http://localhost:3308/getimage/${props.child.sellerId}/${props.child.brand}/${props.child.productName}`
        )
        .then((res) => {
          // console.log(image);
          // console.log(res.data);
          if(res.data){
            // console.log(res.data.images);
            setImage(res.data.images);
          }
          // console.log(image);
        });
    }
    fetchData();
  }, [props]);

  const handleAddToCart = async () => {
    let request = {
      sellerId: props.child.sellerId,
      productName: props.child.productName,
      brand: props.child.brand,
      price: props.child.price,
      discountId: props.child.discountId,
    };

    await axios
      .put(`http://localhost:3308/addToCart/${props.user}`, request)
      .then((res) => {
        console.log("HELLLO!!!");
        console.log(res);
      });
  };

  const toProductPage = () => {
    navigate("/user/product", { state: { item: props, image: image } });
  };

  return (
    <Grid item xs={12} md={4} lg={3} spacing={3}>
      <Card sx={{ maxWidth: 345, maxHeight: 350 }}>
        {/* {console.log("Hello: " + image)} */}
        <img src={`${image && image[0]}`} height="180" width="230"/>

        {/* <Box sx={{ ml: 1, mr: 1, mt: 2, whiteSpace: "pre-line" }}>
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {image &&
                    image.map((img) => <div className="carousel-item">
                    <img src={img} className="d-block w-100" alt="alt"/>
                  </div>)}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon carIcon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon carIcon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </Box> */}

        {/* <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {image.map((img) => (
              <div className="carousel-item">
                {/* <img src={img} className="d-block w-100"/> */}
                {/* <img
                  src={`${img}`}
                  className="d-block w-100"
                  maxHeight="100"
                  height="200"
                  width="230"
                  alt="dummyImage"
                />
              </div> */}
            {/* ))} */}
          {/* </div> */}
          {/* <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon carIcon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon carIcon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}

        {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={URL.createObjectURL(`${image}`)}
      /> */}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.child.productName && props.child.productName.length > 15
              ? props.child.productName.slice(0, 15) + "..."
              : props.child.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {props.child.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount: {props.child.discountId}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              toProductPage();
            }}
          >
            More
          </Button>
          <Button size="small" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ItemCard;
