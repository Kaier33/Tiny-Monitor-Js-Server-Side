const { blacklist } = require("../config/projects-blacklist");
const { MYREDIS_PASSWORD, MYREDIS_HOST, MYREDIS_PORT } = process.env;
const ErrorModel = require("../model/error");
const IoRedis = require("ioredis");
const redis = new IoRedis(`redis://:${MYREDIS_PASSWORD}@${MYREDIS_HOST}:${MYREDIS_PORT}`);
class CollectFrontendError {
  static async reportErr(ctx) {
    ctx.body = "";
    try {
      const body = typeof(ctx.request.body) === 'string' ?  JSON.parse(ctx.request.body) : ctx.request.body;
      if (blacklist.includes(body.error_info.key)) return
      const data = JSON.stringify({
        p_id: body.error_info.key,
        ip: ctx.request.ip,
        header: ctx.request.header,
        error_type: body.error_info.type || '',
        error_id: body.error_info.errorId || '',
        user_id: body.error_info.userId || '',
        error_info: body.error_info,
        breadcrumb_trail: body.breadcrumb_trail
      });
      await redis.xadd("mystream", 'MAXLEN', 500, "*", "reportData", data);
    } catch (error) {
      console.log('report_err::', error);
    }
  }

  static async performanceTest(ctx) {
    ctx.body = "";
    try {
      const data = JSON.stringify({
        p_id: 'test',
        error_type: "test",
        error_id: "2333333333",
        user_id: "2333333333",
        error_info: "(¦3[▓▓] ",
        exception_time: new Date().getTime()
      });
      await redis.xadd("mystream", 'MAXLEN', 500, "*", "reportData", data);
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
