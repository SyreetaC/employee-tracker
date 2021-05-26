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
  let answer = await inquirer.prompt();
};

//exit = connection end

init();
