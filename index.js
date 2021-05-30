const mysql = require("mysql");
const inquirer = require("inquirer");
const Db = require("./db/db");
const db = new Db("company_db");

//Group functions by entity

let inProgress = true;
//where logic for queries will be stored

const init = async () => {
  await db.start();

  while (inProgress) {
    const question = {
      name: "action",
      type: "list",
      message: "Select an option below:",
      choices: [
        //view
        {
          short: "Employees",
          value: "viewAllEmployees",
          name: "View All Employees",
        },
        {
          short: "Roles",
          value: "viewAllRoles",
          name: "View All Roles",
        },
        {
          short: "Departments",
          value: "viewAllDepartments",
          name: "View All Departments",
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
        //add
        {
          short: "Add Employee",
          value: "addEmployee",
          name: "Add an Employee",
        },
        {
          value: "addRole",
          name: "Add Role",
        },
        {
          value: "addDepartment",
          name: "Add Departments",
        },
        //update
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

        //remove
        {
          short: "Remove Employee",
          value: "removeEmployee",
          name: "Remove an Employee",
        },
        {
          value: "removeRole",
          name: "Remove Role",
        },
        {
          value: "removeDepartment",
          name: "Remove Departments",
        },
        //budget
        {
          short: "Budget",
          value: "viewBudget",
          name: "View Utilised Budget for a Department",
        },
        //exit
        {
          short: "Exit",
          value: "exit",
          name: "Exit",
        },
      ],
    };

    const { action } = await inquirer.prompt(question);

    if (action === "exit") {
      await db.end();
      inProgress = false;
    } else {
      if (action === "viewAllDepartments") {
        await viewAllDepartments();
      } else if (action === "viewAllEmployees") {
        await viewAllEmployees();
      } else if (action === "viewAllRoles") {
        await viewAllRoles();
      } else if (action === "viewAllEmployeesByDepartment") {
        await viewEmployeesByDepartment();
      }
    }
  }
};

//function to view each employee, department and role.
const viewAllEmployees = async () => {
  const query = "SELECT * FROM employees";
  const data = await db.query(query);
  console.table(data);
};

const viewAllDepartments = async () => {
  const query = "SELECT * FROM departments";
  const data = await db.query(query);
  console.table(data);
};

const viewAllRoles = async () => {
  const query = "SELECT * FROM job_roles";
  const data = await db.query(query);
  console.table(data);
};

//view by functions
const viewEmployeesByDepartment = async (department) => {
  //Construct query for getting choices
  const query = "SELECT * FROM departments";
  const data = await db.query(query);
  console.log(data);
  const departmentChoices = await data.map((department) => {
    //Return a "choice" object for inquirer
    return {
      short: department.name,
      value: department.id,
      name: `View the ${department.name} department`,
    };
  });
  const question = {
    name: "departmentId",
    type: "list",
    message: "Which department would you like to view?",
    choices: departmentChoices,
  };
  console.log(department);
  //Ask question and get deptId to use in query
  const { departmentId } = await inquirer.prompt(question);
  //Use Id above to select employees by departmentId
  //Use console.table() to display results
};
//List of departments to choose from
//which department do you want to see the employees for?- list of departments (name) and id (value)
//send in department id
//select from employee where department id = department id

//add functions
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

//update functions
//function to choose a specific employee by id and update it/ choose from a list of employees? UPDATE
const updateEmployee = async () => {
  console.log("update an employee here");
  //await connection to table
  //await inquirer prompt answers
};

const updateEmployeeRole = async () => {
  console.log("update an employee here");
  //await connection to table
  //await inquirer prompt answers
};

const updateEmployeeManager = async () => {
  console.log("update an employee here");
  //await connection to table
  //await inquirer prompt answers
};

//delete functions
//function to choose a specific employee by id and delete it/ choose from a list of employees? DELETE
const deleteEmployee = async () => {
  console.log("delete an employee here");
  //await connection to table
  //await inquirer prompt answers
};

const deleteRole = async () => {
  console.log("delete a role here");
  //await connection to table
  //await inquirer prompt answers
};

const deleteDepartment = async () => {
  console.log("delete a department here");
  //await connection to table
  //await inquirer prompt answers
};

init();
