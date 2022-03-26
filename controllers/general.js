const {
  blacklist,
  blacklistPush,
  blacklistDel,
} = require("../config/projects-blacklist");

class General {
  static async getProjectsBlackList(ctx) {
    ctx.body = {
      code: 200,
      message: "ok",
      data: blacklist,
    };
  }

  static async addToProjectsBlackList(ctx) {
    blacklistPush(ctx.request.body.p_id);
    ctx.body = {
      code: 200,
      message: "add successfully",
    };
  }

  static async delFromProjectsBlackList(ctx) {
    blacklistDel(ctx.params.p_id);
    ctx.body = {
      code: 200,
      message: "delete successfully",
    };
  }
}

module.exports = General;
