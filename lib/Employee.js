// const Role = require("./Role");
const db = require('../routes/employeeRoutes');
let Employee = class {
  constructor(first_name, last_name, role_ID, manager) {
    // super(title);
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_ID = role_ID;
    this.manager = manager;
  }
  getFirst() {
    return this.first_name;
  }
  getLast() {
    return this.last_name;
  }
  getRole() {
    return this.role_ID;
  }
  lookupRoleID(title) {
      const sql = `SELECT ID FROM role WHERE title = ${title}`;
      db.query(sql, (err, results) => {
          return results[0];
      }) 
  }
  createNewEmployee() {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (${this.first_name},${this.last_name},${this.role_ID},${this.manager})`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      console.table(results);
      console.log("query was reached");
    });
  }
}
module.exports = Employee;
