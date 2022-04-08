const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
const db = mysql.createConnection({
    socketPath: '',
    user: 'ugn9m7thgbcygptq',
    host: 'bzis71ynoshgkzzhxuza-mysql.services.clever-cloud.com',
    password: 'BoziVzfg9HgvcCxVuf8E',
    database: 'bzis71ynoshgkzzhxuza'
});

db.connect(function(error){
    if(!!error) {
        console.log('Error');
    }
    else {
        console.log('Connected');
    }
})

app.listen(3001, () => {
    console.log("server is running on port");
});