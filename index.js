const inquirer = require("inquirer");
const db = require("./config/connection");
const cTable = require("console.table");
getChoice = () => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "tables",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee role",
          "View all roles",
          "Add role",
          "View all departments",
          "Add department",
          "Finished",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      const choice = response.tables[0];
      const choiceArr = choice.split(" ");
      // first word in choice array
      let action = choiceArr[0];
      // table is last word in choice array
      let table = choiceArr[choiceArr.length - 1].toLowerCase();
      console.log(`table: ${table}`);
      console.log(`action: ${action}`);
      // if last letter is "s", remove it
      if (table.split("").slice(-1) == "s") {
        let removed = table.split("").pop();
        table = table.split("").slice(0, -1).join("");
        console.log(`${removed} has been removed. new table value: ${table}`);
        console.log(`choice: ${choice}`);
      }
      choice == `View all ${table}s`
        ? viewTable(table)
        : choice === "Add employee"
        ? addEmployee()
        : choice === "Update employee role"
        ? console.log("calling updateRole()")
        : // : choice === "View All Roles"
        // ? console.log("calling viewRoles")
        choice === "Add role"
        ? console.log("calling addRole()")
        : // : choice === "View All Departments"
        // ? console.log("calling viewDepartments()")
        choice === "Add department"
        ? console.log("calling addDept()")
        : choice === "Finished"
        ? terminateApp()
        : console.log("error");
    });
};
viewTable = (table) => {
  db.query(`SELECT * FROM ${table}`, (err, results) => {
    if (err) throw err;
    console.table(results);
    console.log("query was reached");
  });
};
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What's the employee's first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What's the employee's last name?",
      },
      {
        type: "checkbox",
        name: "role",
        message: "What's the employee's role?",
        choices: [
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
      {
        type: "input",
        name: "manager",
        message: "Who's the employee's manager?",
      },
    ])
    .then((data) => {
      console.log(data);
    });
};

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();
