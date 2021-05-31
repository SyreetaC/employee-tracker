const mysql = require("mysql");
const inquirer = require("inquirer");
const Db = require("./db/db");
const db = new Db("company_db");

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
        //update
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
      } else if (action === "addEmployee") {
        await addEmployee();
      } else if (action === "addRole") {
        await addRole();
      } else if (action === "removeEmployee") {
        await deleteEmployee();
      } else if (action === "updateEmployeeRole") {
        await updateEmployeeRole();
      } else if (action === "updateEmployeeManager") {
        await updateEmployeeManager();
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

//view by function
const viewEmployeesByDepartment = async () => {
  //Query for getting choices
  const query = "SELECT * FROM departments";
  const data = await db.query(query);
  //Get choices for departments and make question obj
  const departmentChoices = await data.map((department) => {
    //Return a "choice" object for inquirer
    return {
      short: department.dept_name,
      value: department.id,
      name: department.dept_name,
    };
  });
  const question = {
    name: "departmentId",
    type: "list",
    message: "Which department would you like to view?",
    choices: departmentChoices,
  };
  //Ask question and get deptId to use in query
  const { departmentId } = await inquirer.prompt(question);
  console.log(departmentId);

  const departmentEmployees = await db.parameterisedQuery(
    "SELECT first_name, last_name, title, salary, role_id, department_id, dept_name AS department FROM employees LEFT JOIN job_roles ON role_id = job_roles.id LEFT JOIN departments ON department_id = departments.id WHERE department_id = ?",
    [departmentId]
  );
  console.table(departmentEmployees);
};

//add functions
const addEmployee = async () => {
  const roles = await db.query("SELECT * FROM job_roles");

  const managers = await db.query(
    "SELECT employees.first_name, employees.last_name, manager_id, title FROM employees LEFT JOIN job_roles ON role_id = job_roles.id WHERE title LIKE '%Manager%'"
  );

  const answer = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the first name of the Employee?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the last name of the Employee?",
    },
    {
      name: "employeeRoleId",
      type: "list",
      choices: roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      }),
      message: "What is this Employee's role id?",
    },
    {
      name: "employeeManagerId",
      type: "list",
      choices: managers.map((manager) => {
        return {
          name: manager.first_name,
          value: manager.id,
        };
      }),
      message: "What is this Employee's Manager's Id?",
    },
  ]);

  const result = await db.parameterisedQuery("INSERT INTO employees SET ?", {
    first_name: answer.firstName,
    last_name: answer.lastName,
    role_id: answer.employeeRoleId,
    manager_id: answer.employeeManagerId,
  });
  console.table(result);
  console.log(`${answer.firstName} ${answer.lastName} added successfully!`);
};

const addRole = async () => {
  const departments = await db.query("SELECT * FROM departments");

  const answer = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of this role?",
    },
    {
      name: "departmentId",
      type: "list",
      choices: departments.map((departmentId) => {
        return {
          name: departmentId.dept_name,
          value: departmentId.department_id,
        };
      }),
      message: "What department does this role belong to?",
    },
  ]);

  //How do I use the department id and insert a role?
  //figure out query
  const { role } = await db.parameterisedQuery("INSERT INTO job_roles SET ??", {
    title: answer.title,
    salary: answer.salary,
    department_id: answer.departmentId,
  });

  console.log(`${role.title} role added successfully.`);
};

//update functions
//function to choose a specific employee by id and update it/ choose from a list of employees? UPDATE
const updateEmployeeRole = async () => {
  const employees = await db.query("SELECT first_name FROM employees");
  const roles = await db.query("SELECT * FROM job_roles");

  const employeeChoices = employees.map((employee) => {
    return {
      short: employee.first_name,
      value: employee.id,
      name: employee.first_name,
    };
  });
  const roleChoices = roles.map((role) => {
    return {
      short: role.id,
      value: role.title,
    };
  });
  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeName",
      message: "Which employee would you like to update?",
      choices: employeeChoices,
    },
  ]);
  const { roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "roleTitle",
      message: "Which role would you like to add to this employee?",
      choices: roleChoices,
    },
  ]);
  const updateQuery = await db.parameterisedQuery(
    "UPDATE employees SET role_id = '?' WHERE id = '?'",
    [employeeId, roleId]
  );
  console.log(updateQuery);
};

const updateEmployeeManager = async () => {
  const employees = await db.query("SELECT first_name FROM employees");
  const managers = await db.query("SELECT manager_id FROM employees");
  //await connection to table
  //await inquirer prompt answers
};

//delete function
//function to choose a specific employee by id and delete it/ choose from a list of employees? DELETE
const deleteEmployee = async () => {
  const employees = "SELECT * FROM employees";
  const data = await db.query(employees);
  const employeeChoices = await data.map((employee) => {
    return {
      short: employee.id,
      value: employee.id,
      name: `Delete the following employee: ${employee.first_name}`,
    };
  });
  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee would you like to delete?",
      choices: employeeChoices,
    },
  ]);

  await db.parameterisedQuery("DELETE FROM ?? WHERE ?? = '?'", [
    "employees",
    "employees.id",
    employeeId,
  ]);
};

init();
