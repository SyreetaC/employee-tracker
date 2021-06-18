USE company_db;
-- Departments --
INSERT INTO departments (dept_name) VALUES ('Sales');
INSERT INTO departments (dept_name) VALUES ('Finance');
INSERT INTO departments (dept_name) VALUES ('Human Resources');

-- Roles --
INSERT INTO job_roles (title, salary, department_id) VALUES ('Sales Representative', '25000.00', '1');
INSERT INTO job_roles (title, salary, department_id) VALUES ('Sales Manager', '35000.00', '1');

INSERT INTO job_roles (title, salary, department_id) VALUES ('Payroll Advisor', '30000.00', '2');

INSERT INTO job_roles (title, salary, department_id) VALUES ('Regional Manager', '65000.00', '3');
INSERT INTO job_roles (title, salary, department_id) VALUES ('Senior HR Advisor', '55000.00', '3');
INSERT INTO job_roles (title, salary, department_id) VALUES ('HR Advisor', '45000.00', '3');
INSERT INTO job_roles (title, salary, department_id) VALUES ('Associate HR Advisor', '23000.00', '3');

-- Employees --
INSERT INTO employees (first_name, last_name, role_id) VALUES 
('Sarah', 'Allen', '7'),
('John', 'Smith', '6'),
  ('Nicola', 'Hemming', '1'),
 ('Shabnam', 'Hussain', '2'),
 ('George', 'Potter', '3'),
 ('David', 'Lloyd', '4'),
 ('Charlotte', 'Hunt', '7'),
 ('Lydia', 'Adams', '5'),
 ('Devinder', 'Singh', '1');

-- Set managers --
UPDATE employees SET manager_id = 6 WHERE id = 1; 
UPDATE employees SET manager_id = 6 WHERE id BETWEEN 1 and 8; 
UPDATE employees SET manager_id = NULL WHERE id = 5;
UPDATE employees SET manager_id = 4 WHERE id = 9;