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
  const sql = 'SELECT * FROM Products WHERE category = "Electonics"';
  
    connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });

});

app.listen("3306", () => console.log("Server started at port 3306"));
