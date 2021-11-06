const Sequelize = require("sequelize");
const sequelize = new Sequelize("monitor", "root", "123456", {
  host: "192.168.1.101",
  // host: "10.0.3.38",
  port: "3306",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Mysql connection is successful");
  })
  .catch((err) => {
    console.log("链接失败:");
    throw new Error(err);
  });

module.exports = sequelize;
