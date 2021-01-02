const mysql = require('mysql');
require('dotenv').config();

const host = `${process.env.HOST}`;
const user = `${process.env.USER}`;
const pass = `${process.env.PASS}`;
const database = `${process.env.DB}`;

//database: database
const db = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: database,
    timezone: 'utc'  //<-here this line was missing
});

db.connect((e) => {
    if (e) {
        console.log("conection failed! error: " + e.message);
        return;
    }
    console.log("conection success");
});

module.exports = db;
