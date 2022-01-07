const Sequelize = require("sequelize");
const sequelize = new Sequelize("monitor", "root", "123456", {
  host: 'monit-js-db',
  // host: '127.0.0.1',
  // host: "192.168.1.101",
  // host: "10.0.3.38",
  // port: "3306",
  port: "2333",
  dialect: "mysql",
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
