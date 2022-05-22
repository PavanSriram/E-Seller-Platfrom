import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useLocation } from "react-router";
import { Divider } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import buyImage from "./defaultImage.png"
import axios from "axios";
import { useEffect, useState } from "react";


function Product(props) {
  // console.log("product ", props);
  const [image, setImage] = useState([]);

  useEffect(() => {
    // console.log(props.child.productName);
    // let request = { productName: props.child.productName, brand: props.child.brand, sellerId: props.child.sellerId };
    // console.log(request);
    //   // console.log("Hello");
    async function fetchData() {
      await axios
        .get(
          `http://localhost:3308/getimage/${product.sellerId}/${product.brand}/${product.productName}`
        )
        .then((res) => {
          console.log(image);
          console.log(res.data);
          setImage(res.data.image);
          console.log(image);
        });
    }
    fetchData();
  }, [props]);

  const {product} = useLocation().state;
  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <Typography>
            <p><b>Product Name</b> : {product.productName}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Brand</b> : {product.brand}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Title</b> : {product.title}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Category</b> : {product.category}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Sub Category</b> : {product.subCategory}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Price</b> : {product.price}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Quantity</b> : {product.quantity}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Discount Id</b> : {product.discountId}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Dimensions</b> : {product.dimensions}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Description</b> : {product.description}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Images</b> : </p>
            <Box sx={{ ml: 1, mr: 1, mt: 2, whiteSpace: "pre-line" }}>
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={buyImage} className="d-block w-100" alt="..."/>
                </div>
                  {
                    image.map((img) => <div className="carousel-item">
                    <img src={img} className="d-block w-100" alt={buyImage}/>
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
            </Box>
            <hr style={{height: "0.3px"}}/>
            <p><b>Number of Orders</b> : {product.numberOfOrders}</p>
            <hr style={{height: "0.3px"}}/>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Product;
