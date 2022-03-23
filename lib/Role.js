const Department = require("./Department");
class Role extends Department {
    constructor(title, salary, department_id) {
        super(department_id);
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
    getTitle() {
        return this.title;
    }
    getSalary() {
        return this.salary;
    }
    getDeptID() {
        return this.department_id;
    }
}

module.exports = Role;