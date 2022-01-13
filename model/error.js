const sequelize = require("../database/index");
const Seq = require("sequelize");

const errorModel = sequelize.define(
  "error",
  {
    id: {
      type: Seq.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    p_id: {
      type: Seq.STRING,
    },
    error_type: {
      type: Seq.STRING,
    },
    error_id: {
      type: Seq.STRING,
    },
    error_info: {
      type: Seq.STRING,
    },
    user_id: {
      type: Seq.STRING,
    },
    ip: {
      type: Seq.STRING,
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
    status: {
      type: Seq.TINYINT,
      allowNull: true
    },
    createdAt: {
      type: Seq.DATE,
      field: 'created_at',
      allowNull: true,
      defaultValue: Seq.NOW
    },
    updatedAt: {
      type: Seq.DATE,
      field: 'updated_at',
      allowNull: true,
      detaultValue: Seq.NOW
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
	  updatedAt: false,
  }
);

module.exports = errorModel;
