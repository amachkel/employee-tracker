const inquirer = require("inquirer");
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
      const choice = response.tables[0].split(" ");
      let action = choice[0];
      let table = choice[choice.length - 1];
      console.log(`table: ${table}`);
      console.log(`action: ${action}`);
      let tableName = table.split("").slice(-1);
      console.log(tableName);
      if (table.split("").slice(-1) == "s") {
        let removed = table.split("").pop();
        table = table.split("").slice(0, -1).join("");
        console.log(`${removed} has been removed. new table value: ${table}`);
      }
      return action === "View"
        ? viewTable(table)
        : action === "Add"
        ? addToTable(table)
        : action === "Update"
        ? updateTable(table)
        : terminateApp();
    });
};

addEmploye = () => {
  inquirer.prompt([
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
      choices: [],
    },
  ]);
};

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();
