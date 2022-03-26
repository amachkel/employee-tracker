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

      choice.indexOf("View") != -1
        ? viewTable(choice)
        : choice === "Add employee"
        ? addEmployee()
        : choice === "Update employee role"
        ? console.log("calling updateRole()")
        : choice === "Add role"
        ? addRole()
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
    ])

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
              choices: ["John Doe", "Ashley Rodriguez", "Beverly Kelly"], // needs sql query to check isManagement bool, populate choices w/ truthy names
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
    });
}
addRole = () => {
  let roleObj = {};
  db.query(sql.viewDepartment(), (err, results) => {
    if (err) throw err;
    console.log(`view dept: ${results}`);
    let viewDepartment = [];
    results.forEach((dept) => {
      viewDepartment.push({ name: dept.dept_name, value: dept.id });
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Which department does this role belong to?",
          choices: viewDepartment,
        },
      ])
      .then((deptChoice) => {
        console.log(deptChoice);
        console.log(deptChoice.department)
        roleObj.deptId = deptChoice.department;

        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What role would you like to add?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for this role?",
            },
            {
              type: "confirm",
              name: "isManagement",
              message: "Is this a management position?",
            },
          ])
          .then((data) => {
            roleObj.title = data.title;
            roleObj.salary = data.salary;
            roleObj.isManagement = data.isManagement;
            db.query(
              sql.addRole(
                roleObj.title,
                roleObj.salary,
                roleObj.deptId,
                roleObj.isManagement
              ),
              (err, results) => {
                if (err) throw err;
                console.log("created role");
                getChoice();
              }
            );
          });
      });
  });
};

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();
