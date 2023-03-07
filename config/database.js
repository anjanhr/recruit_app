const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("Database is connected");
});

module.exports = connection;
