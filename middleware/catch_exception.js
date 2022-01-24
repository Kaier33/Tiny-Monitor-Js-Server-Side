function catchException() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.body = {
          code: 50014,
          message: err.message || err 
        };
      } else {
        ctx.body = { message: err.message || err };
        ctx.status = 500;
      }
    }
  };
}

module.exports = catchException;
