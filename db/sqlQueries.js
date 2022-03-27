class SqlQueries {
  constructor() {
    this.viewEmployees = function () {
      return `
      SELECT\
      e.first_name,\ 
      e.last_name,\ 
      r.title as role_title,\ 
      d.dept_name,\
      r.salary,\
      CONCAT(e2.first_name, ' ', e2.last_name ) AS manager_name\
      FROM employee e\
      JOIN role r ON r.id = e.role_id\
      JOIN department d ON d.id = r.department_id\
      LEFT OUTER JOIN employee e2 ON e2.id = e.manager_id\
        `;
    };
    this.viewEmployeeTable = function () {
      return `SELECT * FROM employee`;
    };
    this.updateEmployee = function (employee, role) {
      return `UPDATE employee SET role_id = ${role} WHERE id = ${employee}`;
    };
    this.roleNames = function () {
      return `SELECT * FROM role`;
    };
    this.viewRoles = function () {
      return `SELECT r.title, r.salary, d.dept_name FROM role r JOIN department d ON d.id = r.department_id`;
    };
    this.viewDepartment = function () {
      return `SELECT * FROM department`;
    };
    this.getManagerEmployees = function () {
      return `SELECT * FROM employee\
        WHERE manager_id IS NULL`;
    };
    this.addEmployee = function (firstName, lastName, roleID, managerID) {
      return `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleID}, ${managerID})`;
    };
    this.addRole = function (title, salary, department_id, isManagement) {
      return `INSERT INTO role(title, salary, department_id, isManagement) VALUES ("${title}", ${salary}, ${department_id}, ${isManagement})`;
    };
    this.addDepartment = function (department) {
      return `INSERT INTO department (dept_name) VALUES ("${department}")`;
    };
  }
}

module.exports = SqlQueries;
