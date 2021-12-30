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
    p_id: {
      type: Seq.CHAR,
      allowNull: true
    },
    error_type: {
      type: Seq.CHAR,
    },
    error_id: {
      type: Seq.CHAR,
    },
    error_info: {
      type: Seq.STRING,
    },
    user_id: {
      type: Seq.CHAR,
    },
    ip: {
      type: Seq.CHAR,
      allowNull: true
    },
    cookie: {
      type: Seq.STRING,
      allowNull: true
    },
    header: {
      type: Seq.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = errorModel;
