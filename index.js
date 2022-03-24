const inquirer = require("inquirer");
const db = require("./config/connection");
const cTable = require("console.table");
const SqlQueries = require("./db/sqlQueries");

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
        ? viewTable(choice)
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
viewTable = (choice) => {
    var sqlQueries = new SqlQueries();
    if(choice === "View all employees")
    db.query(sqlQueries.viewEmployees(), (err, results) => {
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
        type: "list",
        name: "manager",
        message: "Who's the employee's manager?",
        choices: [] // sql query to check isManagement bool, populate choices w/ truthy names
      },
    ])
    .then((data) => {
      console.log(data);
      const sqlRole = `SELECT role.id FROM role WHERE title = ?`;
      const paramsRole = data.role;
      console.log(`paramsRole: ${paramsRole}`);
      console.log(`sqlRole: ${sqlRole}`);
      let newData;
      db.query(sqlRole, paramsRole, (err, results) => {
        if (err) throw err;
        console.log(results);
        newData = data.push({"role_id": `"${results[1]}"`})
        console.log(newData);
      });
        let sqlQueries = new SqlQueries();
        const getRoleSql = sqlQueries.getRoleByName(data.role);
        const addEmployeeSql = sqlQueries.addEmployee(data.first, data.last); //this is not complete
        //`INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?)`;
        const params = [`${data.first}, ${data.last}, ${data.role}, ${data.manager}`];
        db.query(sql, params, (err, results) => {
          if (err) throw err;
          console.table(results);
          console.log("query was reached");
        });
    });
};

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();
