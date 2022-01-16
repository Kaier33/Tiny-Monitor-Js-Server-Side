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
      type: Seq.STRING(50),
      allowNull: false,
      comment: '项目id'
    },
    error_type: {
      type: Seq.STRING(50),
      allowNull: false,
      comment: '错误类型'
    },
    error_id: {
      type: Seq.STRING(50),
      allowNull: false,
      comment: '错误id'
    },
    error_info: {
      type: Seq.STRING(5000),
      comment: '错误信息'
    },
    user_id: {
      type: Seq.STRING(50),
      comment: '用户id'
    },
    ip: {
      type: Seq.STRING(50),
      allowNull: true,
      comment: 'ip'
    },
    cookie: {
      type: Seq.STRING(2000),
      allowNull: true,
      comment: 'cookie'
    },
    header: {
      type: Seq.STRING(2000),
      allowNull: true,
      comment: 'header'
    },
    breadcrumb_trail: {
      type: Seq.STRING(5000),
      allowNull: true,
      comment: '用户操作轨迹'
    },
    environment: {
      type: Seq.STRING(10),
      defaultValue: 'prod',
      comment: '环境: prod | test'
    },
    status: {
      type: Seq.TINYINT(2),
      defaultValue: '1',
      comment: '状态: 1 unresolved 2 resolved 3 ignored'
    },
    createdAt: {
      type: Seq.DATE,
      field: 'created_at',
      defaultValue: Seq.NOW
    },
    updatedAt: {
      type: Seq.DATE,
      field: 'updated_at',
      detaultValue: Seq.NOW
    }
  },
  {
    tableName: 'error',
    freezeTableName: true,
    createdAt: false,
	  updatedAt: false,
  }
);

module.exports = errorModel;
