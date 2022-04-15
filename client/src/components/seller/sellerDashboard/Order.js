import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function Order(props) {
  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <Typography>
            <p>Order Id : {props.orderId}</p>
            <p>Product Name : {props.productName}</p>
            <p>Brand : {props.brand}</p>
            <p>Quantity : {props.quantity}</p>
            <p>User Id : {props.userId}</p>
            <p>Order Date : {props.orderDate}</p>
            <p>Status : {props.status}</p>
            <p>Payment Id : {props.paymentId}</p>
            <p>Delivery Date : {props.deliveryDate}</p>
            <p>Actual Delivery Date : {props.actualDeliveryDate}</p>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Order;
