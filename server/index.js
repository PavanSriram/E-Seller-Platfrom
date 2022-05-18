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

app.get("/allproducts/:sellerId", (req, res) => {
  const sql = `SELECT * FROM Products WHERE sellerId = ${req.params.sellerId}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/sellerprofile/:sellerId", (req, res) => {
  const sql = `SELECT * FROM sellers WHERE sellerId = ${req.params.sellerId}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/discounts/:sellerId", (req, res) => {
  const sql = `SELECT * FROM Discounts WHERE sellerId = ${req.params.sellerId}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/orders/:sellerId", (req, res) => {
  const sql = `SELECT * FROM Orders WHERE sellerId = ${req.params.sellerId}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/payments/:sellerId", (req, res) => {
  const sql = `SELECT Payments.*
                FROM (
                        SELECT * 
                        FROM Orders 
                        WHERE sellerId = ${req.params.sellerId}
                ) AS T , Payments
                WHERE T.orderId = Payments.orderId`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/allproducts/search/:sellerId/:searchBy/:text", (req, res) => {
  let sql;
  if(req.params.searchBy === "All")
    sql = `SELECT * FROM Products WHERE sellerId = "${req.params.sellerId}" and ((productName LIKE "%${req.params.text}%") or (category LIKE "%${req.params.text}%") or (brand LIKE "%${req.params.text}%") or (price LIKE "%${req.params.text}%") or (quantity LIKE "%${req.params.text}%"))`;
  else
    sql = `SELECT * FROM Products WHERE sellerId = "${req.params.sellerId}" and (${req.params.searchBy} LIKE "%${req.params.text}%")`;
    
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/discounts/search/:sellerId/:searchBy/:text", (req, res) => {
  let sql;
  if(req.params.searchBy === "All")
    sql = `SELECT * FROM Discounts WHERE sellerId = "${req.params.sellerId}" and ((discountId LIKE "%${req.params.text}%") or (expiryDate LIKE "%${req.params.text}%") or (percent LIKE "%${req.params.text}%"))`;
  else
    sql = `SELECT * FROM Discounts WHERE sellerId = "${req.params.sellerId}" and (${req.params.searchBy} LIKE "%${req.params.text}%")`;
    
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/orders/search/:sellerId/:searchBy/:text", (req, res) => {
  let sql;
  if(req.params.searchBy === "All")
    sql = `SELECT * 
            FROM Orders 
            WHERE sellerId = "${req.params.sellerId}" and 
                  (
                    (productName LIKE "%${req.params.text}%") or 
                    (orderId LIKE "%${req.params.text}%") or 
                    (brand LIKE "%${req.params.text}%") or 
                    (quantity LIKE "%${req.params.text}%") or 
                    (status LIKE "%${req.params.text}%") or 
                    (paymentId LIKE "%${req.params.text}%") or 
                    (deliveryDate LIKE "%${req.params.text}%")
                  )`;
  else
    sql = `SELECT * 
            FROM Orders 
            WHERE sellerId = "${req.params.sellerId}" and 
                  (${req.params.searchBy} LIKE "%${req.params.text}%")`;
    
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/payments/search/:sellerId/:searchBy/:text", (req, res) => {
  let sql;
  if(req.params.searchBy === "All")
    sql = `SELECT T2.* 
            FROM (
                    SELECT Payments.*
                    FROM  (
                            SELECT * 
                            FROM Orders 
                            WHERE sellerId = ${req.params.sellerId}
                          ) AS T1 , Payments
                    WHERE T1.orderId = Payments.orderId
            ) AS T2
            WHERE (
                    (T2.paymentId LIKE "%${req.params.text}%") or 
                    (T2.orderId LIKE "%${req.params.text}%") or 
                    (T2.amount LIKE "%${req.params.text}%") or 
                    (T2.paymentMode LIKE "%${req.params.text}%") or 
                    (T2.paymentStatus LIKE "%${req.params.text}%")
            )`;
  else
    sql = `SELECT T2.* 
            FROM (
                    SELECT Payments.*
                    FROM  (
                            SELECT * 
                            FROM Orders 
                            WHERE sellerId = ${req.params.sellerId}
                          ) AS T1 , Payments
                    WHERE T1.orderId = Payments.orderId
            ) AS T2 
            WHERE (${req.params.searchBy} LIKE "%${req.params.text}%")`;
    
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/allproducts/sort/:sellerId/:searchBy/:text/:id/:order", (req, res) => {
  let sql;
  if(req.params.searchBy !== "All")
    sql = `SELECT * 
            FROM (
                    SELECT * 
                    FROM Products 
                    WHERE sellerId = "${req.params.sellerId}" and (${req.params.searchBy} LIKE "%${req.params.text}%")
                  ) as T 
            ORDER BY T.${req.params.id} ${req.params.order}`;
  else
    sql = `SELECT * 
            FROM (
                    SELECT * 
                    FROM Products 
                    WHERE sellerId = "${req.params.sellerId}" and 
                          (
                            (productName LIKE "%${req.params.text}%") or 
                            (category LIKE "%${req.params.text}%") or 
                            (brand LIKE "%${req.params.text}%") or 
                            (price LIKE "%${req.params.text}%") or 
                            (quantity LIKE "%${req.params.text}%")
                          )
                  ) as T 
            ORDER BY T.${req.params.id} ${req.params.order}`;
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  }); 
});

app.get("/allproducts/sort/:sellerId/:id/:order", (req, res) => {
  let sql = `SELECT * 
              FROM (
                      SELECT * 
                      FROM Products 
                      WHERE sellerId = "${req.params.sellerId}"
                    ) as T 
              ORDER BY T.${req.params.id} ${req.params.order}`;
  
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});   

app.get("/discounts/sort/:sellerId/:searchBy/:text/:id/:order", (req, res) => {
  let sql;
  if(req.params.searchBy !== "All")
    sql = `SELECT * 
            FROM (
                    SELECT * 
                    FROM Discounts 
                    WHERE sellerId = "${req.params.sellerId}" and (${req.params.searchBy} LIKE "%${req.params.text}%")
                  ) as T 
            ORDER BY T.${req.params.id} ${req.params.order}`;
  else
    sql = `SELECT * 
            FROM (
              SELECT *
              FROM Discounts 
              WHERE sellerId = "${req.params.sellerId}" and 
              (
                (discountId LIKE "%${req.params.text}%") or 
                (expiryDate LIKE "%${req.params.text}%") or 
                (percent LIKE "%${req.params.text}%")
              )
            ) as T 
            ORDER BY T.${req.params.id} ${req.params.order}`;
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  }); 
});

app.get("/discounts/sort/:sellerId/:id/:order", (req, res) => {
  let sql = `SELECT * 
              FROM (
                      SELECT * 
                      FROM Discounts 
                      WHERE sellerId = "${req.params.sellerId}"
                    ) as T 
              ORDER BY T.${req.params.id} ${req.params.order}`;
  
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/payments/sort/:sellerId/:searchBy/:text/:id/:order", (req, res) => {
  let sql;
  if(req.params.searchBy !== "All")
    sql = `SELECT T.* 
            FROM (
                    SELECT T2.* 
                    FROM (
                            SELECT Payments.*
                            FROM  (
                                    SELECT * 
                                    FROM Orders 
                                    WHERE sellerId = ${req.params.sellerId}
                            ) AS T1 , Payments
                            WHERE T1.orderId = Payments.orderId
                    ) AS T2
                    WHERE (${req.params.searchBy} LIKE "%${req.params.text}%")
            ) as T 
            ORDER BY T.${req.params.id} ${req.params.order}`;
  else
    sql = `SELECT T.* 
            FROM (
                    SELECT T2.* 
                    FROM (
                            SELECT Payments.*
                            FROM  (
                                    SELECT * 
                                    FROM Orders 
                                    WHERE sellerId = ${req.params.sellerId}
                                  ) AS T1 , Payments
                            WHERE T1.orderId = Payments.orderId
                    ) AS T2
                    WHERE (
                            (T2.paymentId LIKE "%${req.params.text}%") or 
                            (T2.orderId LIKE "%${req.params.text}%") or 
                            (T2.amount LIKE "%${req.params.text}%") or 
                            (T2.paymentMode LIKE "%${req.params.text}%") or 
                            (T2.paymentStatus LIKE "%${req.params.text}%")
                    )
              ) as T 
              ORDER BY T.${req.params.id} ${req.params.order}`;

  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  }); 
});

app.get("/payments/sort/:sellerId/:id/:order", (req, res) => {
  let sql = `SELECT T.* 
              FROM (
                SELECT Payments.*
                FROM  (
                        SELECT * 
                        FROM Orders 
                        WHERE sellerId = ${req.params.sellerId}
                      ) AS T1 , Payments
                WHERE T1.orderId = Payments.orderId
              ) as T 
              ORDER BY T.${req.params.id} ${req.params.order}`;
  
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  });
});

app.get("/orders/sort/:sellerId/:searchBy/:text/:id/:order", (req, res) => {
  let sql;
  if(req.params.searchBy !== "All")
    sql = `SELECT * FROM (SELECT * FROM Orders WHERE sellerId = "${req.params.sellerId}" and (${req.params.searchBy} LIKE "%${req.params.text}%")) as T ORDER BY T.${req.params.id} ${req.params.order}`;
  else
    sql = `SELECT * FROM (SELECT * FROM Orders WHERE sellerId = "${req.params.sellerId}" and ((productName LIKE "%${req.params.text}%") or (orderId LIKE "%${req.params.text}%") or (brand LIKE "%${req.params.text}%") or (quantity LIKE "%${req.params.text}%") or (status LIKE "%${req.params.text}%") or (paymentId LIKE "%${req.params.text}%") or (deliveryDate LIKE "%${req.params.text}%"))) as T ORDER BY T.${req.params.id} ${req.params.order}`;
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
    res.send(result);
  }); 
});

app.get("/orders/sort/:sellerId/:id/:order", (req, res) => {
  let sql = `SELECT * FROM (SELECT * FROM Orders WHERE sellerId = "${req.params.sellerId}") as T ORDER BY T.${req.params.id} ${req.params.order}`;
  
  console.log("SQL", sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("res-", result);
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

app.post("/user/check", (req, res) => {
  const sql = `SELECT * FROM users WHERE email = "${req.body.email}"`;
  console.log(req);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/seller/check", (req, res) => {
  const sql = `SELECT * FROM sellers WHERE email = "${req.body.email}"`;
  console.log(req);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("result", result);
    res.send(result);
  });
});

app.post("/seller/signin", (req, res) => {
  const sql = `SELECT * FROM sellers WHERE email = "${req.body.email}" AND password = "${req.body.password}"`;
  // console.log(req);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error : ", err);
    }
    // console.log("Result : ",result);
    res.send(result);
    // console.log("Hellwo");
  });
});

app.post("/seller/register", (req, res) => {
  const sql = `INSERT INTO sellers (firstName, lastName, email, password, address, phoneNumber, companyName) VALUES ("${req.body.firstName}", "${req.body.lastName}", "${req.body.email}", "${req.body.password}", "${req.body.address}", "${req.body.phoneNumber}", "${req.body.companyName}")`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/seller/editproduct/:sellerId/:productName/:brand", (req, res) => {
  console.log("req.body = ", req.params);
  const sql = `UPDATE Products SET productName = "${req.body.productName}", brand = "${req.body.brand}", title = "${req.body.title}", description = "${req.body.description}", price = "${req.body.price}", quantity = "${req.body.quantity}", discountId = "${req.body.discountId}", dimensions = "${req.body.dimensions}", category = "${req.body.category}", subCategory = "${req.body.subCategory}",numberOfOrders = "${req.body.numberOfOrders}" WHERE (sellerId = "${req.params.sellerId}") and  (productName = "${req.params.productName}") and  (brand = "${req.params.brand}")`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error : ", err);
    }
    console.log("res", result);
    res.send(result);
  });
});

app.post("/seller/editprofile/:sellerId", (req, res) => {
  console.log("req.body = ", req.params);
  const sql = `UPDATE sellers SET firstName = "${req.body.firstName}", lastName = "${req.body.lastName}", email = "${req.body.email}", address = "${req.body.address}", phoneNumber = "${req.body.phoneNumber}", companyName = "${req.body.companyName}" WHERE (sellerId = "${req.params.sellerId}")`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error : ", err);
    }
    console.log("res", result);
    res.send(result);
  });
});

app.post("/seller/editdiscount/:discountId", (req, res) => {
  console.log("req.body = ", req.params);
  const sql = `UPDATE Discounts SET expiryDate = "${req.body.expiryDate}", percent = "${req.body.percent}" WHERE discountId = "${req.params.discountId}"`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error : ", err);
    }
    console.log("res", result);
    res.send(result);
  });
});

app.post("/seller/addproduct", (req, res) => {
  const sql = `INSERT INTO Products (sellerId, productName, brand, title, description, price, quantity, discountId, dimensions, category, subCategory, numberOfOrders) VALUES ("${req.body.sellerId}", "${req.body.productName}", "${req.body.brand}", "${req.body.title}", "${req.body.description}", "${req.body.price}", "${req.body.quantity}", "${req.body.discountId}", "${req.body.dimensions}", "${req.body.category}", "${req.body.subCategory}", "${req.body.numberOfOrders}")`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error : ", err);
    }
    console.log("res", result);
    res.send(result);
  });
});

app.post("/seller/addDiscount/:sellerId", (req, res) => {
  const sql = `INSERT INTO Discounts (expiryDate, percent, sellerId) VALUES ("${req.body.expiryDate}", "${req.body.percent}", "${req.params.sellerId}")`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error : ", err);
    }
    console.log("res", result);
    res.send(result);
  });
});

app.delete(
  "/seller/deleteProduct/:sellerId/:productName/:brand",
  (req, res) => {
    const sql = `DELETE FROM Products WHERE sellerId = "${req.params.sellerId}" and productName = "${req.params.productName}" and brand = "${req.params.brand}"`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error : ", err);
      }
      console.log("Delete", result);
      res.send(result);
    });
  }
);

app.delete(
  "/seller/deleteDiscount/:discountId",
  (req, res) => {
    const sql = `DELETE FROM Discounts WHERE discountId = "${req.params.discountId}"`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error : ", err);
      }
      console.log("Delete", result);
      res.send(result);
    });
  }
);

app.delete(
  "/seller/deleteOrder/:sellerId/:productName/:brand",
  (req, res) => {
    const sql = `DELETE FROM Orders WHERE sellerId = "${req.params.sellerId}" and productName = "${req.params.productName}" and brand = "${req.params.brand}"`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error : ", err);
      }
      console.log("Delete", result);
      res.send(result);
    });
  }
);

const { MongoClient } = require("mongodb");
let client;
async function main() {
  const uri =
    "mongodb+srv://e-seller-platform:seller-e-platform@cluster0.78fzo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect((err) => {
      var db = client.db("user");

      console.log("database connected");
      app.get("/usercart/:id", (req, res) => {
        const cart = db
          .collection("cart")
          .findOne({ _id: req.params.id })
          .then(function (cart) {
            console.log(cart);
            res.json(cart);
          });
      });

      app.post("/addusercart/:id", (req, res) => {
        const result = db
          .collection("cart")
          .insertOne({
            _id: req.params.id,
            cart: [],
          })
          .then(function (result) {
            res.json(result);
            console.log("inserted Id", result.insertedId);
          });
      });

      app.put("/updateusercart/:id", (req, res) => {
        const result = db
          .collection("cart")
          .updateOne(
            {
              _id: req.params.id,
            },
            { $set: { cart: [1, 3, 5, 2] } }
          )
          .then(function (result) {
            res.json(result);
            console.log("inserted Id", result.insertedId);
          });
      });

      app.get("/getimage/:sellerId/:brand/:productName", (req, res) => {
        // console.log("HELLO!!")
        // console.log(req.params.sellerId);
        const result = db
          .collection("images")
          .findOne({ productName: req.params.productName, brand: req.params.brand, sellerId: req.params.sellerId })
          .then(function (result) {
            res.json(result);
            console.log(result);
            // console.log("image successfully returned");
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
