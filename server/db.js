const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bzis71ynoshgkzzhxuza-mysql.services.clever-cloud.com',
    user: 'ugn9m7thgbcygptq',
    password : 'BoziVzfg9HgvcCxVuf8E',
    port : 3306, 
    database:'bzis71ynoshgkzzhxuza'
})

module.exports = connection;