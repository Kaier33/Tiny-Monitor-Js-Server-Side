const UsersModel = require("../model/users");
class Users {
  static async listUsers(ctx) {
    const result = await UsersModel.findAll({
      attributes: ["id", "user_name"],
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
