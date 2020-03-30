const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: "root",
  password: "root",
  database: "agenda-petshop"
})

module.exports = connection;

// const { Client } = require('pg')
// var connectionString = "postgres://postgres:eco123@localhost:5432/agenda-petshop";

// const connection = new Client({connectionString});

// module.exports = connection;

// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// const dbPath = path.resolve(__dirname + '/../data/', 'db.sqlite');
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err)
//     console.log(err);
//   else
//     console.log("connection success");
// });

// module.exports = db;