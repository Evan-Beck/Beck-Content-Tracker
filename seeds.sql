-- Uses the companies database created in schema.
USE companies_db;

-- Inserts data into the department table. 
INSERT INTO department (name) 
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Marketing');

-- Inserts data into the role table. 
INSERT INTO role (title, salary, department_id) 
VALUES 
('Sales Lead', 100000.00, 1),
 ('Salesperson', 50000.00, 1), 
  ('Software Engineer Lead', 120000.00, 2),
    ('Software Engineer', 70000.00, 2),
     ('Account Manager', 100000.00, 3),
     ('Accountant', 70000.00, 3),
     ('Marketing Director', 100000.00, 4); 

-- Inserts data into the employee table. 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, NULL), 
('Jane', 'Doe', 2, 1);