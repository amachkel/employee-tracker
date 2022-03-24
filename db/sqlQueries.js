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
    this.addEmployee = function(firstName, lastName)
    {
        return `INSERT into employee(first_name, last_name) values (${firstName}, ${lastName})`;
    }
    this.getRoleByName = function(roleName)
    {
        //fix the syntax here
        return `Select * from roles where title = ${roleName}`
    }
    this.getManagerEmployees = function()
    {
        return `SELECT * from Employees\
        JOIN role on employee.role_id = role.Id\
        WHERE role.isManagement = true`;
    }
    this.getManagerIdByFirstNameLastName = function(firstName, lastName)
    {
        return `Select id from employee where first_name = ${firstName} and last_name = ${lastName}`
    }
  }
}

module.exports = SqlQueries;
