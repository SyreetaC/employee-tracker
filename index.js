const mysql = require("mysql");
const inquirer = require("inquirer");
const Db = require("./db/db");

let inProgress = true;
//where logic for queries will be stored
//research console table to present each query in a table

const init = async () => {
  // const db = new Db("company_db");

  // await db.start();

  while (inProgress) {
    const question = {
      name: "action",
      type: "list",
      message: "Select an option below:",
      choices: [
        //change to choice object rather than array! Short, value, name
        {
          short: "Employees",
          value: "viewAllEmployees",
          name: "View All Employees",
        },
        {
          short: "Employees By Department",
          value: "viewAllEmployeesByDepartment",
          name: "View All Employees By Department",
        },
        {
          short: "Employees By Role",
          value: "viewAllEmployeesByRole",
          name: "View All Employees By Role",
        },
        {
          short: "Add Employee",
          value: "addEmployee",
          name: "Add an Employee",
        },
        {
          short: "Remove Employee",
          value: "removeEmployee",
          name: "Remove an Employee",
        },
        {
          value: "updateEmployee",
          name: "Update an Employee",
        },
        {
          value: "updateEmployeeRole",
          name: "Update Employee Role",
        },
        {
          value: "updateEmployeeManager",
          name: "Update Employee Manager",
        },
        {
          short: "Roles",
          value: "viewAllRoles",
          name: "View All Roles",
        },
        {
          value: "addRole",
          name: "Add Role",
        },
        {
          value: "removeRole",
          name: "Remove Role",
        },
        {
          short: "Departments",
          value: "viewAllDepartments",
          name: "View All Departments",
        },
        {
          value: "addDepartment",
          name: "Add Departments",
        },
        {
          value: "removeDepartment",
          name: "Remove Departments",
        },
        {
          short: "Budget",
          value: "viewBudget",
          name: "View Utilised Budget for a Department",
        },
        {
          short: "Exit",
          value: "exit",
          name: "Exit",
        },
      ],
    };

    const answer = await inquirer.prompt(question);

    if (answer.action === "exit") {
      await db.end();
      inProgress = false;
    } else {
      console.log(answer);
    }
  }
};

//give initial options using inquirer
// view ...., create..., update...., delete...exit...

//function to view each employee, department and role.
const viewEmployees = async () => {
  console.log("View employees here");
  //await connection to table
};

//function to add new with questions from inquirer again. Once questions answered, insert into correct table using INSERT INTO
const addEmployee = async () => {
  console.log("add new employee here");
  //await inquirer prompt answers
  //await connection to table to INSERT
};

const addRole = async () => {
  console.log("add new role here");
  //await inquirer prompt answers
  //await connection to table to INSERT
};

const addDepartment = async () => {
  console.log("add new department here");
  //await inquirer prompt answers
  //await connection to table to INSERT
};

//function to choose a specific employee by id and update it/ choose from a list of employees? UPDATE
const updateEmployee = async () => {
  console.log("update an employee here");
  //await connection to table
  //await inquirer prompt answers
};

init();
