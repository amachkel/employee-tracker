const router = require("express").Router();
const mysql = require("mysql2");
const config = require("../config");
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: config.DB_USER,
      // MySQL password
      password: config.DB_PASSWORD,
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  module.exports = router;