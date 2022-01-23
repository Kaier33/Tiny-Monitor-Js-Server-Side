const log4js = require("log4js");
const { formatError, formatRes } = require("../utils/format-log");

// todo: 
// node的异常异常捕获
log4js.configure({
  appenders: {
    error: {
      type: "file", //日志类型
      // type: "dateFile",
      category: "errLogger", //日志名称
      filename: __dirname + "/../logs/system/error", //日志输出位置，当目录文件或文件夹不存在时自动创建
      // pattern: 'yyyy-MM-dd.log', //日志输出模式
      // alwaysIncludePattern: true,
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100, //当文件内容超过文件存储空间时，备份文件的数量
    },
    response: {
      type: "dateFile",
      category: "resLogger",
      filename: __dirname + "/../logs/responses/res",
      pattern: 'yyyy-MM-dd.log', //日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100,
    },
  },
  categories: {
    error: { appenders: ["error"], level: "error" },
    response: { appenders: ["response"], level: "info" },
    default: { appenders: ["response"], level: "info" },
  },
});

const _errorLogger = log4js.getLogger("error");
const _resLogger = log4js.getLogger("response");

function errLogger(ctx, error) {
  if (ctx && error) {
    _errorLogger.error(formatError(ctx, error));
  }
}

function resLogger(ctx, costTime) {
  if (ctx) {
    _resLogger.info(formatRes(ctx, costTime));
  }
}

function serverLogger(err) {
  if (err) {
    _resLogger.info(err)
  }
}

function logHandle() {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    if (ctx.response.status >= 500) {
      const ms = new Date() - start;
      resLogger(ctx, ms);
    }
  };
}

module.exports = { errLogger, resLogger, logHandle, serverLogger };
