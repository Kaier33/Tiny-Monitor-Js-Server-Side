const UsersModel = require("../model/users");
const { SHA256 } = require("../utils/tool");
class Users {
  static async userInfo(ctx) {
    const result = await UsersModel.findOne({
      attributes: ["u_id", "username", "nickname", "avatar", "email"],
      where: {
        u_id: ctx.state.user.u_id,
      },
    });
    ctx.body = {
      code: 200,
      message: "ok",
      data: result,
    };
  }

  static async listUsers(ctx) {
    const result = await UsersModel.findAll({
      attributes: ["id", "u_id", "username", "nickname", "email", "avatar"],
      where: {
        status: 1,
      },
    });
    ctx.body = {
      code: 200,
      message: "ok",
      data: {
        list: result,
      },
    };
  }

  static async userDetail(ctx) {
    console.log("ctx::", ctx.state);
    ctx.body = "user detail";
  }

  static async updateUser(ctx) {
    const { nickname = '', email = '', avatar = '' } = ctx.request.body
    await UsersModel.update({
      nickname,
      email,
      avatar
    }, {
      where: {
        u_id: ctx.state.user.u_id
      }
    })
    const user = await UsersModel.findOne({
      attributes: ['username', 'nickname', 'nickname', 'email', 'avatar'],
      where: {
        u_id: ctx.state.user.u_id
      }
    })
    ctx.body = {
      code: 200,
      message: '更新成功',
      data: user
    }
  }

  static async deleteUser(ctx) {
    ctx.body = "delete user";
  }

  static async changePassword(ctx) {
    const user = await UsersModel.findOne({
      attributes: ['u_id', 'password'],
      where: {
        u_id: ctx.state.user.u_id
      }
    })
    const equal = user.password === SHA256(ctx.request.body.oldpass)
    if (!equal) {
      ctx.body = {
        code: 200403,
        message: '原密码错误'
      }
    } else {
      await UsersModel.update({
        password: SHA256(ctx.request.body.password)
      }, {
        where: {
          u_id: ctx.state.user.u_id
        }
      })
      ctx.body = {
        code: 200,
        message: '修改密码成功',
      }
    }
  }
}

module.exports = Users;
