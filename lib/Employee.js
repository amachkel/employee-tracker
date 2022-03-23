const Role = require("./Role");
class Employee extends Role {
    constructor(first_name, last_name) {
        super(role_ID);
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_ID = role_ID;
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
}
module.exports = Employee;