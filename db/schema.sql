DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

(CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);)

(CREATE TABLE job_role (
  id INT NOT NULL,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id)

);)

(CREATE TABLE department(
  id INT NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
))