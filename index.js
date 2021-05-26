const mysql = require("mysql");
const inquirer = require("inquirer");
const Db = require("./db/db");

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
      "Update Employee",
      "Update Role",
      "Update Department",
      "Exit",
    ],
  });

  //add switch/case here to go through each option. If exit, connection end.
};

//exit = connection end

init(initialOptions()); //db not currently connecting when this is called.
