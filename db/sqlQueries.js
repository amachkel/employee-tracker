class SqlQueries {
  constructor() {
    this.viewEmployees = function () {
      return `
        SELECT employee.role_id AS id,\
        employee.first_name,\
        employee.last_name,\
        role.title AS title\
        FROM employee\
        JOIN role ON employee.role_id = role.id;\
        `;
    };
    this.getRoleByName = function (roleName) {
      //fix the syntax here
      return `SELECT role_id FROM role WHERE title = ${roleName}`;
    };
    this.getManagerEmployees = function () {
      return `SELECT * FROM employee\
        JOIN role on employee.role_id = role.Id\
        WHERE role.isManagement = true`;
    };
    this.getManagerIdByFirstNameLastName = function (firstName, lastName) {
      return `SELECT id FROM employee WHERE first_name = ${firstName} AND last_name = ${lastName}`;
    };
    this.addEmployee = function (firstName, lastName, roleID, managerID) {
      return `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (${firstName}, ${lastName}, ${roleID}, ${managerID})`;
    };
  }
}

module.exports = SqlQueries;
