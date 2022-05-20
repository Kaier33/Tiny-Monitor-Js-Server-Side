function genValidateParams(schema) {
  return async (ctx, next) => {
    let data;
    if (ctx.request.method === 'GET') {
      data = ctx.query
    } else {
      data = ctx.request.body
    }
    const { error } = schema.validate(data)
    if (error) {
      ctx.status = 400
      ctx.body = {
        message: error.message || '参数错误'
      }
      return
    }
    await next()
  }
}

module.exports = genValidateParams;