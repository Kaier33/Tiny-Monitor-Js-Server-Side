const sequelize = require("../database/index");
const Seq = require("sequelize");

const errorModel = sequelize.define(
  "error",
  {
    id: {
      type: Seq.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    error_type: {
      type: Seq.CHAR,
    },
    error_id: {
      type: Seq.CHAR,
    },
    error_info: {
      type: Seq.TEXT,
    },
    user_id: {
      type: Seq.CHAR,
    },
    ip: {
      type: Seq.CHAR,
    },
    cookie: {
      type: Seq.CHAR,
    },
    header: {
      type: Seq.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = errorModel;
