const inquirer = require("inquirer");
const db = require("./config/connection");
const cTable = require("console.table");
const SqlQueries = require("./db/sqlQueries");
const sql = new SqlQueries();

const initDb = () => {
  db.connect((err) => {
    if (err) throw err;
    console.log("connected to the database");
    console.log("Welcome to the employee management system");
  });
};

initDb();

getChoice = () => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "choices",
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
      const choice = response.choices[0];
      // console.log(`indexOf: ${choice.indexOf("View")}`);
      choice.indexOf("View") != -1
        ? viewTable(choice)
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
viewTable = (choice) => {
  console.log(`Choice: ${choice}`);
  let viewQuery = "";
  if (choice === "View all employees") {
    viewQuery = sql.viewEmployees();
  } else if (choice === "View all roles") {
    viewQuery = sql.viewRoles();
  } else {
    viewQuery = sql.viewDepartment();
  }
  if (viewQuery === "") throw new error("Did not provide valid choice.");

  db.query(viewQuery, (err, results) => {
    if (err) throw err;
    console.log("");
    console.table(results);
    getChoice();
  });
};

function addEmployee() {
  let empObj = {};
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
    ]) // data object: {first, last, role, manager}
    // role: SELECT r.id FROM role r JOIN r.id =
    .then((data) => {
      empObj.firstName = data.first;
      empObj.lastName = data.last;
      db.query(sql.getRoleByName(data.role), (err, results) => {
        if (err) throw err;
        empObj.role = results[0].id;
        // console.log(empObj);
        inquirer
          .prompt([
            {
              type: "list",
              name: "manager",
              message: "Who's the employee's manager?",
              choices: ["John Doe", "Ashley Rodriguez", "Beverly Kelly"], // sql query to check isManagement bool, populate choices w/ truthy names
            },
          ])
          .then((data) => {
            db.query(
              sql.getManagerIdByName(
                data.manager.split(" ")[0],
                data.manager.split(" ")[1]
              ),
              (err, results) => {
                if (err) throw err;
                empObj.manager = results[0].id;
                console.log(empObj);
                db.query(
                  sql.addEmployee(
                    empObj.firstName,
                    empObj.lastName,
                    empObj.role,
                    empObj.manager
                  ),
                  (err, results) => {
                    if (err) throw err;
                    console.log("created employee");
                    getChoice();
                  }
                );
              }
            );
          });
      });
      //now we need to query the roles
      //.then((roles) =>{
      // now we need to query the managers
      //  .then((managers) => {
      //convert obj to array
      //const propertyValues = Object.values(empObj);
      //now we need to add the employee.
      //}
      //}

      // let createdEmployee;
      // db.query(
      //   sql.addEmployee(data.first, data.last, addUserRoleId, addUserManagerId),
      //   (err, results) => {
      //     if (err) throw err;

      //     createdEmployee = results[0];
      //     console.log(createdEmployee);
      //   }
      // );
      //this is not complete
      // console.log(`getMngr: ${getMngrSql}`);
      // console.log(`getRole: ${getRoleSql}`);
      // console.log(`addEmployee: ${addEmployeeSql}`);
      // console.table(addEmployeeSql);
    });
}

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();
