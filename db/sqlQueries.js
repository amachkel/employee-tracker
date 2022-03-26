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
    this.viewRoles = function () {
      return `SELECT r.title, r.salary, d.dept_name FROM role r JOIN department d ON d.id = r.department_id`;
    };
    this.viewDepartment = function () {
      return `SELECT * FROM department`;
    };
    this.getRoleByName = function (roleName) {
      return `SELECT id FROM role WHERE title = "${roleName}"`;
    };
    this.getManagerEmployees = function () {
      return `SELECT * FROM employee\
        JOIN role on employee.role_id = role.Id\
        WHERE role.isManagement = true`;
    };
    this.getManagerIdByName = function (firstName, lastName) {
      return `SELECT id FROM employee WHERE first_name = "${firstName}" AND last_name = "${lastName}"`;
    };
    this.addEmployee = function (firstName, lastName, roleID, managerID) {
      return `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleID}, ${managerID})`;
    };
  }
}

module.exports = SqlQueries;
