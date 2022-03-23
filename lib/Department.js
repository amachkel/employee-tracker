let Department = class {
    constructor(dept_name) {
        this.dept_name = dept_name;
    }
    getDeptName(){
        return this.dept_name;
    }
}

module.exports = Department;