const mysql = require ('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'company_db'
}); 

connection.connect(err => {
    if (err) throw err;
    promptUser();
});

function promptUser() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do',
        choices: [
            'Add department',
            'Add role',
            'Add employee',
            'Exit'
        ]
    }).then(answer => {
        switch(answer.action) {
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole ();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Exit':
                console.log("Goodbye!");
                break;
        }
    });
}

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