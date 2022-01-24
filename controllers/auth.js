const UsersModel = require("../model/users");
const jwt = require("jsonwebtoken");
const { SHA256 } = require("../utils/tool");
const { customAlphabet } = require("nanoid/async");

const { JWT_SECRET } = require("../config/constants");
class Auth {
  static async login(ctx) {
    const user = await UsersModel.findOne({
      where: {
        user_name: ctx.request.body.user_name,
        password: SHA256(ctx.request.body.password),
      },
    });
    if (user) {
      ctx.body = {
        code: 200,
        message: "ok",
        data: {
          token: jwt.sign({ id: user.dataValues.u_id }, JWT_SECRET, {
            expiresIn: "3h",
          }),
        },
      };
    } else {
      ctx.body = {
        code: 403,
        message: "用户名或密码错误",
      };
    }
  }
  static async register(ctx) {
    const exist = await UsersModel.findOne({
      where: {
        user_name: ctx.request.body.user_name,
      },
    });
    if (!exist) {
      const nanoid = customAlphabet("1234567890abcdef", 10);
      const user = {
        u_id: await nanoid(),
        user_name: ctx.request.body.user_name,
        password: SHA256(ctx.request.body.password),
      };
      await UsersModel.create(user);
      ctx.body = {
        code: 200,
        message: "创建用户成功",
        data: "ok",
      };
    } else {
      ctx.body = {
        code: 403,
        message: "用户已存在",
      };
    }
  }
}

module.exports = Auth;
