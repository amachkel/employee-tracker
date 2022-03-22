const inquirer = require("inquirer");

getChoice = () => {
  inquirer.prompt([
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
    console.log(response);
  })
};
getChoice();
