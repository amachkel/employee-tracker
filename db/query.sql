SELECT
    employee.role_id AS id, role.title AS title
FROM employee
JOIN role ON employee.role_id = role.id;

-- +------+-------------------+
-- | id   | title             |
-- +------+-------------------+
-- |    1 | Lead Engineer     |
-- |    2 | Software Engineer |
-- |    3 | Account Manager   |
-- |    4 | Accountant        |
-- |    5 | Legal Team Lead   |
-- |    6 | Lawyer            |
-- +------+-------------------+