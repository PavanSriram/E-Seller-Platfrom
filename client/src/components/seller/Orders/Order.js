import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useLocation } from "react-router";

function Order(props) {
  const {order} = useLocation().state;
  return (
    <Box sx={{ justifyContent: "center", mt: 3, ml: 15, mr: 15 }}>
      <Card>
        <CardContent>
          <Typography>
            <p><b>Order Id</b> : {order.orderId}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Product Name</b> : {order.productName}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Brand</b> : {order.brand}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Quantity</b> : {order.quantity}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>User Id</b> : {order.userId}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Order Date</b> : {order.orderDate}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Status</b> : {order.status}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Payment Id</b> : {order.paymentId}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Delivery Date</b> : {order.deliveryDate}</p>
            <hr style={{height: "0.3px"}}/>
            <p><b>Actual Delivery Date</b> : {order.actualDeliveryDate}</p>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Order;
