-- // insert data here

USE company_db;

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


UPDATE employees SET manager_id = 6 WHERE id = 1; 
UPDATE employees SET manager_id = 6 WHERE id BETWEEN 1 and 8; 
UPDATE employees SET manager_id = NULL WHERE id = 5;
UPDATE employees SET manager_id = 4 WHERE id = 9;