const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// db.connect(err => {
//   if(err) {
//     throw err;
//   }
//   console.log('MySQL connected')
// })

setInterval(() => {
    connection.query("SELECT 1");
}, 5000);

app.get("/fashion", (req, res) => {
  const sql = 'SELECT * FROM Products WHERE category = "Fashion"';
  
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

app.get("/electronics", (req, res) => {
  const sql = 'SELECT * FROM Products WHERE category = "Electonics"';
  
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

app.get("/sports", (req, res) => {
  const sql = 'SELECT * FROM Products WHERE category = "Sports"';
  
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

app.get("/user/orders", (req, res) => {
  const sql = `SELECT * FROM Orders WHERE userId = 1`;
  
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

//check this once
app.get("/cart", (req, res) => {
  const sql = `SELECT * FROM Orders WHERE userID = ${req.body.userId}`;
  
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

app.get("/user/profile", (req, res) => {
  const sql = `SELECT * FROM Orders WHERE userId = ${req.body.userId}`;
  
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

app.post("/seller/addproduct", (req, res) => {
  const sql = `INSERT INTO Products (sellerId, productName, brand, title, description, price, quantity, discountId, dimensions, category, subCategory, numberOfOrders) VALUES ("${req.body.sellerId}", "${req.body.productName}", "${req.body.brand}", "${req.body.title}", "${req.body.description}", "${req.body.price}", "${req.body.quantity}", "${req.body.discountId}", "${req.body.dimensions}", "${req.body.category}", "${req.body.subCategory}", "${req.body.numberOfOrders}")`;

    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });
})

app.get("/seller/orders", (req, res) => {
  const sql = `SELECT * FROM Orders WHERE sellerId = ${req.body.sellerId}`;

  connection.query(sql, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
    res.send(result);
  });
})

app.listen("3307", () => console.log("Server started at port 3307"));
