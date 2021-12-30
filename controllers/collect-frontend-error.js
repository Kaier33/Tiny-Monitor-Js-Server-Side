const ErrorModel = require("../model/error");
const IoRedis = require("ioredis");
const redis = new IoRedis("redis://:123456@127.0.0.1:2332");
class CollectFrontendError {
  static async reportErr(ctx) {
    ctx.body = "";
    try {
      // console.log("**************** 上报错误 ************");
      // todo: 接口出错的时候, 上报携带cookie 和 header和 token 如果有的话
      // console.log('cookie::', ctx.cookies.get('dmiddle_sso_token'))
      // console.log('header::', ctx.request.header)
      // console.log('ip::', ctx.request.ip)
      // console.log('body::', ctx.request.body);
      // console.log('type::', typeof(ctx.request.body))
      const body = JSON.parse(ctx.request.body);
      const data = JSON.stringify({
        error_type: body.type,
        error_id: body.errorId,
        user_id: body.userId,
        error_info: ctx.request.body,
      });
      await redis.xadd("mystream", 'MAXLEN', 500, "*", "reportData", data);
      // await ErrorModel.create({
      //   error_type: body.type,
      //   error_id: body.errorId,
      //   user_id: body.userId,
      //   error_info: ctx.request.body,
      // });
    } catch (error) {
      console.log("error::", error);
    }
  }

  static async performanceTest(ctx) {
    ctx.body = "";
    try {
      // await ErrorModel.create({
      //   error_type: "test",
      //   error_id: "2333333333",
      //   user_id: "2333333333",
      //   error_info: "(¦3[▓▓] ",
      // });
      const data = JSON.stringify({
        error_type: "test",
        error_id: "2333333333",
        user_id: "2333333333",
        error_info: "(¦3[▓▓] ",
      });
      await redis.xadd("mystream", 'MAXLEN', 100, "*", "reportData", data);
    } catch (error) {
      console.log("error::", error);
    }
  }

  static async deleteTestData(ctx) {
    ctx.body = "";
    try {
      await ErrorModel.destroy({
        where: {
          error_type: "test",
        },
      });
    } catch (error) {
      console.log("error::", error);
    }
  }
}
module.exports = CollectFrontendError;
