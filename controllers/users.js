const UsersModel = require("../model/users");
class Users {
  static async userInfo(ctx) {
    const result = await UsersModel.findOne({
      attributes: ["u_id", "username", "nickname", "avatar"],
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
    ctx.body = "update user";
  }

  static async deleteUser(ctx) {
    ctx.body = "delete user";
  }
}

module.exports = Users;
