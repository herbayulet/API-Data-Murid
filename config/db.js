// panggil
const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Haha_kocak12",
  database: "students_db",
});

module.exports = mysqlPool;
