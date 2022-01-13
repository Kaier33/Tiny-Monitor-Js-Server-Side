const { MYREDIS_PASSWORD, MYREDIS_HOST, MYREDIS_PORT } = process.env
const ErrorModel = require("../model/error");
const IoRedis = require("ioredis");
const redis = new IoRedis(`redis://:${MYREDIS_PASSWORD}@${MYREDIS_HOST}:${MYREDIS_PORT}`);
class CollectFrontendError {
  static async reportErr(ctx) {
    ctx.body = "";
    try {
      const body = JSON.parse(ctx.request.body);
      const data = JSON.stringify({
        p_id: body.key,
        ip: ctx.request.ip,
        header: ctx.request.header,
        error_type: body.type || '',
        error_id: body.errorId || '',
        user_id: body.userId || '',
        error_info: ctx.request.body,
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
