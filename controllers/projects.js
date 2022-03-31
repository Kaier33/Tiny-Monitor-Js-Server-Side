const ErrorModel = require("../model/error");
const ProjectsModel = require("../model/projects");
const UserToProjectModel = require("../model/user_to_project");
const sequelize = require("../database/index");

const { customAlphabet } = require("nanoid/async");

const find_own_projects = function (u_id) {
  if (typeof u_id === "string") {
    return `
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
      WHERE users.u_id = "${u_id}";
    `;
  }
};

const in_statement = function (arr) {
  let str = `p_id IN (`;
  arr.forEach((ele) => {
    str += `"${ele}",`;
  });
  return str.slice(0, str.length - 1) + ")";
};

const last_24_hours_statistics = function (p_ids = []) {
  if (Array.isArray(p_ids)) {
    return `
      SELECT 
        p_id, FROM_UNIXTIME(exception_time/1000, '%Y-%m-%d %H') as time, count(*) as count
      FROM
        error
      WHERE
        FROM_UNIXTIME(exception_time/1000, '%Y-%m-%d %H:%m:%s') > DATE_SUB(NOW(), INTERVAL 24 HOUR)
      AND
        ${in_statement(p_ids)}
      GROUP BY 
        time, p_id
      ORDER BY
        time;
    `;
  }
};

const member_list = function (p_id) {
  return `
    SELECT
	    u.u_id,
	    u.username,
	    u.nickname,
	    u.email,
	    u.avatar 
    FROM
	    users AS u
	    INNER JOIN user_to_project AS utp ON utp.u_id = u.u_id
    AND
      u.status = 1
	  AND 
      utp.p_id = '${p_id}';
  `;
};

class Projects {
  static async list(ctx) {
    const project_list = await sequelize.query(
      find_own_projects(ctx.state.user.u_id),
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false,
      }
    );
    if (project_list.length) {
      const statistics_data = await sequelize.query(
        last_24_hours_statistics(project_list.map((item) => item.p_id)),
        {
          type: sequelize.QueryTypes.SELECT,
          raw: true,
          logging: false,
        }
      );
      project_list.forEach((p_ele) => {
        p_ele.statistics_data = [];
        statistics_data.forEach((s_ele) => {
          if (p_ele.p_id === s_ele.p_id) {
            p_ele.statistics_data.push(s_ele);
          }
        });
      });
    }
    ctx.body = {
      code: 200,
      message: "ok",
      data: {
        list: project_list,
      },
    };
  }

  static async create(ctx) {
    const exist = await ProjectsModel.findOne({
      where: {
        p_name: ctx.request.body.p_name,
      },
    });
    if (!exist) {
      const nanoid = customAlphabet("1234567890abcdefghizklmnopqrstuvwsyzABCDEFGHIZKLMNOPQRSTUVWSYZ", 15);
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
        u_id: ctx.state.user.u_id,
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

  static async delete(ctx) {
    const own = await UserToProjectModel.findOne({
      where: {
        u_id: ctx.state.user.u_id,
        p_id: ctx.request.params.p_id,
      },
    });
    if (own) {
      await ProjectsModel.destroy({
        where: {
          p_id: ctx.request.params.p_id,
        },
      });
      await UserToProjectModel.destroy({
        where: {
          p_id: ctx.request.params.p_id,
          u_id: ctx.state.user.u_id,
        },
      });
      await ErrorModel.destroy({
        where: {
          p_id: ctx.request.params.p_id,
        },
      });
      ctx.body = {
        code: 200,
        message: "删除成功",
      };
    } else {
      ctx.body = {
        code: 401,
        message: "账号无权限进行该操作!",
      };
    }
  }

  static async invite(ctx) {}

  static async info(ctx) {
    const p_id = ctx.request.params.p_id;
    const projectInfo = await ProjectsModel.findOne({
      attributes: ["p_id", "p_name", "p_desc", "p_tech", "creator_id"],
      where: {
        p_id,
      },
    });
    const userIds = await sequelize.query(member_list(p_id), {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });
    ctx.body = {
      code: 200,
      data: {
        projectInfo,
        memberList: userIds,
      },
      message: "ok",
    };
  }
}

module.exports = Projects;
