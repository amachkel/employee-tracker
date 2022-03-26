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
-- first_name  last_name  role_title         dept_name    salary  manager_name
-- ----------  ---------  -----------------  -----------  ------  ----------------
-- John        Doe        Lead Engineer      Engineering  150000  null
-- Mike        Chan       Software Engineer  Engineering  120000  John Doe
-- Ashley      Rodriguez  Account Manager    Finance      160000  null
-- Kat         Vineyard   Accountant         Finance      125000  Ashley Rodriguez
-- Beverly     Kelly      Legal Team Lead    Legal        250000  null
-- Tom         Allen      Lawyer             Legal        190000  Beverly Kelly


-- View all roles
-- title              salary  dept_name
-- -----------------  ------  -----------
-- Lead Engineer      150000  Engineering
-- Software Engineer  120000  Engineering
-- Account Manager    160000  Finance
-- Accountant         125000  Finance
-- Legal Team Lead    250000  Legal
-- Lawyer             190000  Legal

-- View all departments
-- id  dept_name
-- --  -----------
-- 1   Engineering
-- 2   Finance
-- 3   Legal
-- 4   Sales