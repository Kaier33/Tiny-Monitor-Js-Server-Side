const ProjectsModel = require("../model/projects");
const UserToProjectModel = require("../model/user_to_project");
const sequelize = require("../database/index")

const { customAlphabet } = require("nanoid/async");

class Projects {
  static async list(ctx) {
    const sql = `
      SELECT 
        projects.p_id,
        projects.p_name,
        projects.p_desc,
        projects.p_tech
      FROM
        user_to_project
      LEFT JOIN users 
        ON user_to_project.u_id = users.u_id
      LEFT JOIN projects 
        ON user_to_project.p_id = projects.p_id
      WHERE users.u_id = "${ctx.state.user.u_id}"
    `
    const data = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })
    ctx.body = {
      code: 200,
      message: "ok",
      data,
    };
  }

  static async create(ctx) {
    const exist = await ProjectsModel.findOne({
      where: {
        p_name: ctx.request.body.p_name,
      },
    });
    if (!exist) {
      const nanoid = customAlphabet("1234567890abcdef", 10);
      const p_id = await nanoid();
      const project = {
        p_id,
        p_name: ctx.request.body.p_name,
        p_desc: ctx.request.body.p_desc || "",
        p_tech: ctx.request.body.p_tech || "",
        creator_id: ctx.state.user.u_id,
      };
      await ProjectsModel.create(project);
      await UserToProjectModel.create({
        p_id,
        u_id: ctx.state.user.u_id
      });
      ctx.body = {
        code: 200,
        message: "创建项目成功",
        data: "ok",
      };
    } else {
      ctx.body = {
        code: 403,
        message: "项目名已存在",
      };
    }
  }

  static async update(ctx) {}

  static async delete(ctx) {}

  static async invite(ctx) {}
}

module.exports = Projects;
