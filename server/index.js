const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
    console.log(req);
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

// const cartRouter = require('./routes/cart.js');
// app.use('/usercart', cartRouter); 

// async function findCart(client, id){
//   const result = await client.db("user").collections("cart").findOne({_id: id});
//   if(result) {
//     console.log(`Found cart item '${id}'`);
//     console.log(result);
//   }
//   else {
//     console.log("No item found");
//   }
//   return result;
// }

const { MongoClient } = require('mongodb');
let client;
async function main() {
  const uri = "mongodb+srv://e-seller-platform:seller-e-platform@cluster0.78fzo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect((err) => {
      var db = client.db("user");
      
      console.log("database connected")
      app.get("/usercart/:id", (req, res) => {
        const cart = db.collection("cart").findOne({_id : req.params.id})
        .then( function(cart) {
          console.log(cart); 
          res.json(cart);
        });
        
      });

      app.post("/addusercart/:id", (req,res) => {
          const result = db.collection("cart").insertOne({
            _id: req.params.id,
            cart: []
          })
          .then( function(result) {
            res.json(result);8
            console.log('inserted Id', result.insertedId);
          });
      });

      app.put("/updateusercart/:id", (req,res) => {
          const result = db.collection("cart").updateOne({
            _id: req.params.id
          },{$set: {cart : [1, 3, 5, 2]}})
          .then( function(result) {
            res.json(result);
            console.log('inserted Id', result.insertedId);
          });
      });

      

    });
  } catch (e) {
    console.error(e);
  } 
 
}

main().catch(console.error);

// app.get("/user/cart", (req, res) => {
//   res.json(findCart(client, 1));
// })
  
app.listen("3308", () => console.log("Server started at port 3308"));
   