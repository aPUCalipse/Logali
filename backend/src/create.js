var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "logali"
});

con.connect(function(err) {
    if (err) console.log(err);
    console.log("Connected!");
    con.query("CREATE DATABASE logali", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });