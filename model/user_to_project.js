const sequelize = require("../database/index");
const Seq = require("sequelize");

const userToProjectModel = sequelize.define(
  "user_to_project",
  {
    id: {
      type: Seq.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id'
    },
    p_id: {
      type: Seq.STRING(20),
      allowNull: false,
      comment: '项目id'
    },
    u_id: {
      type: Seq.STRING(20),
      allowNull: false,
      comment: '用户id'
    },
    createdAt: {
      type: Seq.DATE,
      field: "created_at",
      allowNull: true,
      defaultValue: Seq.NOW,
    },
    updatedAt: {
      type: Seq.DATE,
      field: "updated_at",
      allowNull: true,
      detaultValue: Seq.NOW,
    },
  },
  {
    tableName: 'user_to_project',
    freezeTableName: true,
  }
);
// userToProjectModel.sync();
// userToProjectModel.sync({ alter: true });
module.exports = userToProjectModel;