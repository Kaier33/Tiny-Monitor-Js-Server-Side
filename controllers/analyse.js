const ErrorModel = require("../model/error");

class Analyse {
  static async list(ctx) {
    try {
      const result = await ErrorModel.findAndCountAll();
      ctx.body = {
        message: "ok",
        data: {
          list: result,
        },
      };
    } catch (error) {
      console.log("error::", error);
    }
  }
}

module.exports = Analyse;
