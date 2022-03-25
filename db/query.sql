SELECT
    employee.role_id AS id, role.title AS title
FROM employee
JOIN role ON employee.role_id = role.id;
-- JOIN role & employee
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

-- View all employees
-- id  first_name  last_name  title
-- --  ----------  ---------  -----------------
-- 1   John        Doe        Lead Engineer    
-- 2   Mike        Chan       Software Engineer
-- 3   Ashley      Rodriguez  Account Manager  
-- 4   Kat         Vineyard   Accountant       
-- 5   Beverly     Kelly      Legal Team Lead
-- 6   Tom         Allen      Lawyer