module.exports = function errorHandle() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.log("err::", err);
      console.log("err_ct::", ctx);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: 'System Exception',
      };
    }
  };
};
