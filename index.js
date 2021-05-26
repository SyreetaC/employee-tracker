const mysql = require("mysql");
const inquirer = require("inquirer");
const Db = require("./db/db");

//research console table to present each query in a table

//where logic for queries will be stored

const init = async () => {
  const db = new Db("company_db");

  await db.start();
};

//give initial options using inquirer
// view ...., create..., update...., delete...exit...
const initialOptions = async () => {
  let answer = await inquirer.prompt({
    name: "optionSelection",
    type: "list",
    message: "Select an option below:",
    choices: [
      "View Employees",
      "View Departments",
      "View Roles",
      "Create new Employee",
      "Add new Role",
      "Add new department",
      "Update Employee details",
      "Exit",
    ],
  });
  //add switch/case here to go through each option. If exit, connection end.
};

//function to view each employee, department and role.
const viewEmployees = async () => {
  console.log("View employees here");
  //await connection to table
  initialOptions();
};

//function to add new with questions from inquirer again. Once questions answered, insert into correct table using INSERT INTO
const addEmployee = async () => {
  console.log("add new employee here");
  //await inquirer prompt answers
  initialOptions();
};

const addRole = async () => {
  console.log("add new role here");
  //await inquirer prompt answers
  initialOptions();
};

const addDepartment = async () => {
  console.log("add new department here");
  //await inquirer prompt answers
  initialOptions();
};

//function to choose a specific employee by id and update it/ choose from a list of employees? UPDATE
const updateEmployee = async () => {
  console.log("update an employee here");
  //await connection to table
  //await inquirer prompt answers
  initialOptions();
};
init();
