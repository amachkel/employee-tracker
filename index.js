const inquirer = require("inquirer");

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
        ],
      },
    ])
    .then((response) => {
      const choice = response.tables[0].split(" ");
      let action = choice[0];
      let table = choice[choice.length - 1];
      console.log(`table: ${table}`);
      console.log(`action: ${action}`);
      return action === "View"
        ? viewTable(table)
        : action === "Add"
        ? addToTable(table)
        : updateTable(table);
    });
};

viewTable = (table) => {
  if (table.slice(-1) === "s") {
    console.log(`view: ${table}`);
  }
};

addToTable = (table) => {
  console.log(`add to: ${table}`);
};

updateTable = (table) => {
  console.log(`update: ${table}`);
};
getChoice();
