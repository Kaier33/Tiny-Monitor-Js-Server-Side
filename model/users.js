const sequelize = require("../database/index");
const Seq = require("sequelize");

const usersModel = sequelize.define(
  "users",
  {
    id: {
      type: Seq.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    u_id: {
      type: Seq.STRING(50),
      allowNull: false,
      comment: '用户id'
    },
    user_name: {
      type: Seq.STRING(30),
      allowNull: false,
      comment: '账号'
    },
    password: {
      type: Seq.STRING(100),
      allowNull: false,
      comment: '密码'
    },
    nickname: {
      type: Seq.STRING(10),
      allowNull: true,
      comment: '昵称'
    },
    email: {
      type: Seq.STRING(30),
      allowNull: true,
      comment: '邮箱'
    },
    avatar: {
      type: Seq.STRING(200),
      allowNull: true,
      comment: '用户头像的网络地址'
    },
    status: {
      type: Seq.TINYINT(2),
      defaultValue: '1',
      comment: '账号状态 - 1: alive, 2: freeze, 3: dead'
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
    tableName: 'users',
    freezeTableName: true,
    // createdAt: false,
    // updatedAt: false,
  }
);
// usersModel.sync();
// usersModel.sync({ alter: true });
module.exports = usersModel;
