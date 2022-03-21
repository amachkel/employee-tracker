const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;