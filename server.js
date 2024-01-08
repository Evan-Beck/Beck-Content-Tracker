// Require for import modules. 
const mysql = require ('mysql2');
const inquirer = require('inquirer');

// Defined MySQL connection object to database, username and password.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'companies_db'
}); 

// Connection to MySQL server.
connection.connect(err => {
    if (err) throw err;
    promptUser();
});

// Function that prompts the user with options in CLI. It uses the inquirer package to display the options below choices to the user.
function promptUser() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do',
        choices: [
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add Role',
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    }).then(answer => {
        switch(answer.action) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log("Goodbye!");
                connection.end();
                break;
        }
    });
}
// Function to view all departments. Connection.query retrieves all rows from the department table through a SQL select query.
function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results); // Displays the results in a table format using console.table, then calls the promptUser function to continue in CLI.   
        promptUser();
    });
}
// Function to add new department, using inquirer.prompt to ask the user for the new department name. It uses a (?) SQL query to insert the name of the new department into the table.
function addDepartment() {
    inquirer.prompt({
     name: 'departmentName',
     type: 'input',
     message: 'Enter the name of the new department:'   
    }).then(answer => {
        const query = `INSERT INTO department (name) VALUES (?)`;
        connection.query(query, [answer.departmentName], (err, res) => {
            if (err) throw err;
            console.log(`Department added: ${answer.departmentName}`);
        });
    });
}
// The functions all work similarly as the previous two that were explained. 
function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
        promptUser();
    });
}

function addRole() {
    inquirer.prompt([
        {
        name: 'title',
        type: 'input',
        message: 'What is the title for this role?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?'
    },
    {
        name: 'departmentId',
        type: 'input',
        message: 'What is the department ID for this role?'
    }
]).then(answer => {
    const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
connection.query(query, [answer.title, parseFloat(answer.salary), parseInt(answer.departmentId)], (err, res) => {
   if (err) throw err;
   console.log(`Role added: ${answer.title} in department ${answer.departmentId}`);
});
});
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        promptUser();
    });
}

function addEmployee () {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is your first name?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is your last name?'
        },
        {
        name: 'roleId',
        type: 'input',
        message: 'What is your role ID?'
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'What is your managers ID?'
        }
    ]).then(answer => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ? ,?)`;
    connection.query(query, [answer.firstName, answer.lastName, parseInt(answer.roleId), answer.managerId ? parseInt(answer.managerId) : null], (err, res) => {
        console.log(`Employee added: ${answer.firstName} ${answer.lastName}`);
    });
    });
}
// Function for update employee role. Inquirer prompts the user to enter the employee ID and new role ID. 
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: 'employeeId',
            type: 'input',
            message: 'Enter the ID of the employee you want to update:'
        },
        {
            name: 'newRoleId',
            type: 'input',
            message: 'Enter the new role ID for the employee:'
        }
    ]).then(async (answers) => {
        const employeeId = parseInt(answers.employeeId);
        const newRoleId = parseInt(answers.newRoleId);
// Parses the employee ID and new role ID into integers. 
        const updateQuery = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const updateValues = [newRoleId, employeeId];
        connection.query(updateQuery, updateValues, (err, res) => {
            if (err) {
                console.error('Error updating employee role:', err);
            } else {
                console.log(`Employee with ID ${employeeId} updated to new role ID ${newRoleId}`);
            }
            promptUser(); // Continue prompting the user for actions. 
        });
    });
}