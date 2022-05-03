import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useLocation } from "react-router";
import { Divider } from "@mui/material";

function Product(props) {
  // console.log("product ", props);
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
