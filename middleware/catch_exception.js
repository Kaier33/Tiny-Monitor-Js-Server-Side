function catchException() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.body = { message: err.message || err };
      ctx.status = 500;
    }
  };
}

module.exports = catchException;
