INSERT INTO department (dept_name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");
-- How to pull department_id without hardcoding
INSERT INTO role (title, salary, department_id)
VALUES  ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES  ("John", "Doe", 1, "Fred"),
        ("Mike", "Chan", 2, "Jimbo"),
        ("Ashley", "Rodriguez", 3, "Jack"),
        ("Kat", "Vineyard", 4, "Jen"),
        ("Beverly", "Kelly", 5, "Ollie"),
        ("Tom", "Allen", 6, "Oddie");