const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const {
  viewTable,
  addToTable,
  updateTable,
} = require("./routes/employeeRoutes");

getChoice = () => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "tables",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Finished",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      const choice = response.tables[0];
      const viewTable = choice.split(" ")[choice.le];
      choice === "Add Employee"
        ? addEmployee()
        : choice === "Update Employee Role"
        ? console.log("calling updateRole()")
        : choice === "Add Role"
        ? console.log("calling addRole()")
        : choice === "Add Department"
        ? console.log("calling addDept()")
        : choice === "Finished"
        ? console.log("calling terminateApp()")
        : console.log("error");
    });

  // const choice = response.tables[0].split(" ");
  // let action = choice[0];
  // let table = choice[choice.length - 1];
  // console.log(`table: ${table}`);
  // console.log(`action: ${action}`);
  // let tableName = table.split("").slice(-1);
  // console.log(tableName);
  // if (table.split("").slice(-1) == "s") {
  //   let removed = table.split("").pop();
  //   table = table.split("").slice(0, -1).join("");
  //   console.log(`${removed} has been removed. new table value: ${table}`);
  // }
  // return action === "View"
  //   ? viewTable(table)
  //   : action === "Add"
  //   ? addToTable(table)
  //   : action === "Update"
  //   ? updateTable(table)
  //   : terminateApp();
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
      const employee = new Employee(
        data.first,
        data.last,
        data.role_ID,
        data.manager
      );
      const role_ID = lookupRoleID(data.role);
      employee.role_ID = role_ID;
      employee.createNewEmployee();
      getChoice();
      console.log(`employee data: ${data}`);
    });
};

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();

module.exports = { addEmployee };
