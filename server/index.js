const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const connection1 = 'mongodb+srv://e-seller-platform:seller-e-platform@cluster0.78fzo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(connection1, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDB Database connected successfully'))
  .catch((error) => console.log(error));


  const Cart = mongoose.model('Cart',require('./schemas/cart.js'), 'cart');

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

// //check this once
// app.get("/cart", (req, res) => {



// });

app.post("/user/profile", (req, res) => {
  console.log(req.body);
  const sql = `SELECT * FROM users WHERE userId = ${req.body.userId}`;
  console.log("Hello");
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

app.post("/user/update", (req, res) => {
  console.log(req.body);
  const sql = `UPDATE users SET address = "${req.body.address}", phoneNumber = "${req.body.phoneNumber}", password = "${req.body.newPassword}" WHERE userId = ${req.body.userId}`;
  // console.log("Hello");
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });
});

app.post("/user/register", (req, res) => {
  const sql = `INSERT INTO users (firstName, lastName, email, password, address, phoneNumber) VALUES ("${req.body.firstName}", "${req.body.lastName}", "${req.body.email}", "${req.body.password}", "${req.body.address}", "${req.body.phoneNumber}")`;

    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });
  });

  app.post("/user/signin", (req, res) => {
    const sql = `SELECT * FROM users WHERE email = "${req.body.email}" AND password = "${req.body.password}"`;
  
      connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send(result);
        // console.log("Hellwo");
      });
    });

  app.post("/seller/register", (req, res) => {
    const sql = `INSERT INTO users (firstName, lastName, email, password, address, phoneNumber, companyName) VALUES ("${req.body.firstName}", "${req.body.lastName}", "${req.body.email}", "${req.body.password}", "${req.body.address}", "${req.body.phoneNumber}", "${req.body.companyName}")`;
  
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

const cartRouter = require('./routes/cart.js');
app.use('/usercart', cartRouter); 

app.get("/user/cart", (req, res) => {
  Cart.findById(req.body.userId, (error, cart) =>{
    console.log(cart);
    res.json(cart);
  })
})
 
app.listen("3307", () => console.log("Server started at port 3307"));
   