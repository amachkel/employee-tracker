// const app = require("express").Router();
const mysql = require("mysql2");
const config = require("../config");
const cTable = require("console.table");
const { addEmployee } =require("./index");
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: config.DB_USER,
    // MySQL password
    password: config.DB_PASSWORD,
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);
// app.get
viewTable = (table) => {
  console.log("viewTable called");
  const sql = `SELECT * FROM ${table}`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    console.log("query was reached");
  });
  getChoice();
};
// app.post
addToTable = (table) => {
  console.log(`adding to: ${table}`);
  table === "Employee"
    ? addEmployee()
    : table === "Role"
    ? addRole()
    : addDepartment();
  const sql = `INSERT INTO ${table}`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    console.log("query was reached");
  });
  getChoice();
};
// app.put
updateTable = (table) => {
  console.log(`update: ${table}`);
};

module.exports = { viewTable, addToTable, updateTable };
module.exports = db;