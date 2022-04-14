import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function Product(props) {
  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <Typography>
            <p>Product Name : {props.productName}</p>
            <p>Brand : {props.brand}</p>
            <p>Title : {props.title}</p>
            <p>Category : {props.category}</p>
            <p>Sub Category : {props.subCategpry}</p>
            <p>Price : {props.price}</p>
            <p>Quantity : {props.quantity}</p>
            <p>Discount Id : {props.discountId}</p>
            <p>Dimensions : {props.dimensions}</p>
            <p>Description : {props.description}</p>
            <p>Images : </p>
            <p>Number of Orders : </p>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Product;
