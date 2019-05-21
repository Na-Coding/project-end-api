var mysql = require('mysql');



var con = mysql.createConnection({
  // host: "192.168.0.106",
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b58a493c462daa",
  password: "5f1c715f",
  database: "heroku_3bd08921992056e"
});

// var con = mysql.createConnection({
//   host: "192.168.0.110",
//   // host: "127.0.0.1",

//   user: "root",
//   password: "",
//   database: "ofse"
// });

// var con = mysql.createConnection({
//   host: "192.168.0.112",
//   // host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "ofse"
// });

con.connect(function (err) {
  if (err) throw err;
  console.log(con.state)
});

module.exports = con;
