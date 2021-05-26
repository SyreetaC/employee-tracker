DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- Look at foreign keys again

CREATE TABLE departments(
  id INT AUTO_INCREMENT NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE job_roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL(7,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
   FOREIGN KEY (role_id) REFERENCES job_roles(id),
   FOREIGN KEY (manager_id) REFERENCES employees(id) 
);




