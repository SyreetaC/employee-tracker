const mysql = require("mysql");
// where queries will be stored.

class Db {
  constructor(database) {
    const dbOptions = {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database,
    };

    this.database = database;
    this.connection = mysql.createConnection(dbOptions);
  }

  //starts the connection to the DB
  start() {
    return new Promise((resolve, reject) => {
      const onConnect = (err) => {
        if (err) reject(err);
        console.log(
          `Connection to ${this.database} database was successful with id ${this.connection.threadId}`
        );
        resolve();
      };

      this.connection.connect(onConnect);
    });
  }

  end(message) {
    this.connection.end();
    console.log(
      message ||
        `Connection to ${this.database} database has been successfully closed.`
    );
  }

  query(sqlQuery) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      };

      this.connection.query(sqlQuery, handleQuery);
    });
  }

  parameterisedQuery(sqlQuery, args, info = false) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      };

      const query = this.connection.query(sqlQuery, args, handleQuery);

      if (info) {
        console.log(query.sql);
      }
    });
  }
}

module.exports = Db;
