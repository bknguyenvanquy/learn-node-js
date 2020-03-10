const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'learn-nodejs',
    password: 'test'
});

module.exports = pool.promise();