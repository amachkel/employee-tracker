INSERT INTO department (dept_name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal");
-- How to pull department_id without hardcoding
INSERT INTO role (title, salary, department_id)
VALUES  ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, null),
        ("Kat", "Vineyard", 4, 3),
        ("Beverly", "Kelly", 5, null),
        ("Tom", "Allen", 6, 5);