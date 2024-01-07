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
    promptuser();
});

function promptUser() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do',
        choices: [
            'Add department',
        ]
    }).then(answer => {
        switch(answer.action) {
            case 'Add department':
                addDepartment();
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