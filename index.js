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
        {
          value: "addDepartment",
          name: "Add Department",
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
      } else if (action === "addDepartment") {
        await addDepartment();
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
    "SELECT employees.first_name, employees.last_name, employees.id, title FROM employees LEFT JOIN job_roles ON role_id = job_roles.id WHERE title LIKE '%Manager%'"
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
      message: "What is this Employee's role?",
    },
    {
      name: "managerConfirm",
      type: "confirm",
      message: "Does this employee have a manager?",
    },
    {
      name: "employeeManagerId",
      type: "list",
      choices: managers.map((manager) => {
        return {
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        };
      }),
      message: "Who is this Employee's Manager?",
      when: (answer) => {
        return answer.managerConfirm;
      },
    },
  ]);

  await db.parameterisedQuery(
    "INSERT INTO ?? SET ?",
    [
      "employees",
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.employeeRoleId,
        manager_id: answer.employeeManagerId,
      },
    ],
    true
  );
  console.log("Employee information added successfully!");
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
  const { role } = await db.parameterisedQuery(
    "INSERT INTO job_roles VALUES ?",
    {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentId,
    }
  );

  console.log(`${role.title} role added successfully.`);
};

const addDepartment = async () => {
  const answer = await inquirer.prompt([
    {
      name: "departmentName",
      type: "input",
      message: "What is the name of the department you would like to add?",
    },
  ]);

  await db.parameterisedQuery("INSERT INTO ?? SET ?", [
    "departments",
    {
      dept_name: answer.departmentName,
    },
  ]);

  console.log(`${answer.departmentName} department added successfully.`);
};
//update functions
//function to choose a specific employee by id and update it/ choose from a list of employees? UPDATE
const updateEmployeeRole = async () => {
  const employees = await db.query("SELECT * FROM employees");
  const roles = await db.query("SELECT * FROM job_roles");

  const employeeChoices = employees.map((employee) => {
    return {
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    };
  });
  const roleChoices = roles.map((role) => {
    return {
      name: role.title,
      short: role.id,
      value: role.id,
    };
  });
  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee would you like to update?",
      choices: employeeChoices,
    },
  ]); //roleId = NULL!
  const { roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role would you like to add to this employee?",
      choices: roleChoices,
    },
  ]);
  const updateQuery = await db.parameterisedQuery(
    "UPDATE employees SET role_id = '?' WHERE id = '?'",
    [employeeId, roleId]
  );
  console.table(updateQuery);
  console.log("Employee updated successfully.");
};

const updateEmployeeManager = async () => {
  const employees = await db.query("SELECT * FROM employees");

  const employeeChoices = await employees.map((employee) => {
    //Return a "choice" object for inquirer
    return {
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    };
  });

  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee would you like to add a manager to?",
      choices: employeeChoices,
    },
  ]);
  const managers = employees.filter((employee) => employee.id !== employeeId);

  const managerChoices = await managers.map((manager) => {
    //Return a "choice" object for inquirer
    return {
      value: manager.id,
      name: `${manager.first_name} ${manager.last_name}`,
    };
  });

  const { managerId } = await inquirer.prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which manager would you like to add to the employee?",
      choices: managerChoices,
    },
  ]);

  const updateManagerQuery = await db.parameterisedQuery(
    "UPDATE employees SET manager_id = '?' WHERE id = '?'",
    [managerId, employeeId]
  );

  console.log("Employee manager updated successfully.");
  console.table(updateManagerQuery);

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
