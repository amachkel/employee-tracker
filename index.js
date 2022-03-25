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
      // let action = choiceArr[0];
      // // table is last word in choice array
      let table = choiceArr[choiceArr.length - 1].toLowerCase();
      console.log(`table: ${table}`);
      // console.log(`action: ${action}`);
      // // if last letter is "s", remove it
      // if (table.split("").slice(-1) == "s") {
      //   let removed = table.split("").pop();
      //   table = table.split("").slice(0, -1).join("");
      //   console.log(`${removed} has been removed. new table value: ${table}`);
      //   console.log(`choice: ${choice}`);
      // }
      choice == `View all ${table}`
        ? viewTable(choice, table)
        : choice === "Add employee"
        ? addEmployee()
        : choice === "Update employee role"
        ? console.log("calling updateRole()")
        : choice === "Add role"
        ? console.log("calling addRole()")
        : choice === "Add department"
        ? console.log("calling addDept()")
        : choice === "Finished"
        ? terminateApp()
        : console.log("error");
    });
};
viewTable = (choice, table) => {
  const sqlQueries = new SqlQueries();
  if (choice === "View all employees")
    db.query(sqlQueries.viewEmployees(), (err, results) => {
      // must get role_id from employee title
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
        choices: ["John Doe"], // sql query to check isManagement bool, populate choices w/ truthy names
      },
    ])
    .then((data) => {
      const sqlQueries = new SqlQueries();
      const getRoleSql = db.query(
        sqlQueries.getRoleByName(data.role),
        (err, results) => {
          if (err) throw err;
          console.dir(results);
          return results;
        }
      );
      const getMngrSql = db.query(
        sqlQueries.getManagerIdByFirstNameLastName(data.manager),
        (err, results) => {
          if (err) throw err;
          const mngrID = [];
          const mngrArr = Object.entries(results);
          mngrArr.forEach(([key, value]) => {
            mngrID.push(key, value);
          });
          console.log(mngrID);
          return mngrID;
        }
      );
      const addEmployeeSql = db.query(
        sqlQueries.addEmployee(data.first, data.last, getRoleSql, getMngrSql),
        (err, results) => {
          if (err) throw err;
          let addEmp = [];
          results.forEach((item) => {
            addEmp.push(item);
          });
          console.log(addEmp);
          return addEmp;
        }
      );
      //this is not complete
      console.log(`getMngr: ${getMngrSql}`);
      console.log(`getRole: ${getRoleSql}`);
      console.log(`addEmployee: ${addEmployeeSql}`);
      console.table(addEmployeeSql);
      //`INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?)`;
      // const params = [`${data.first}, ${data.last}, ${data.role}, ${data.manager}`];
      // db.query(sql, params, (err, results) => {
      //   if (err) throw err;
      //   console.table(results);
      //   console.log("query was reached");
      // });
    });
};

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();
