const sequelize = require("../database/index");
const Seq = require("sequelize");

const projectsModel = sequelize.define(
  "projects",
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
    p_name: {
      type: Seq.STRING(50),
      allowNull: false,
      comment: '项目名称'
    },
    p_desc: {
      type: Seq.STRING(100),
      allowNull: true,
      comment: '项目简述'
    },
    p_tech: {
      type: Seq.STRING(20),
      allowNull: true,
      comment: '技术选型'
    },
    creator_id: {
      type: Seq.STRING(20),
      allowNull: false,
      comment: '创建者id'
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
    tableName: 'projects',
    freezeTableName: true,
  }
);
// projectsModel.sync();
// projectsModel.sync({ alter: true });
module.exports = projectsModel;