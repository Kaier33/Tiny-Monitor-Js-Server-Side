const { MYSQLDB_DATABASE, MYSQLDB_USER, MYSQLDB_ROOT_PASSWORD, MYSQLDB_HOST, MYSQLDB_PORT, NODE_ENV } = process.env
const Sequelize = require("sequelize");
const sequelize = new Sequelize(MYSQLDB_DATABASE, MYSQLDB_USER, MYSQLDB_ROOT_PASSWORD, {
  host: MYSQLDB_HOST,
  port: MYSQLDB_PORT,
  timezone: '+08:00',
  dialect: "mysql",
  logging: NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Mysql connection is successful");
  })
  .catch((err) => {
    console.log("链接失败:::", err);
  });

module.exports = sequelize;
