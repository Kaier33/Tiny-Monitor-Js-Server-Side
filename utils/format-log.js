function formatError(ctx, err) {
  const method = ctx.method;
  const url = ctx.url;
  const body = ctx.request.body;
  const userAgent = ctx.header.userAgent;
  return { method, url, body, userAgent, err };
}

function formatRes(ctx, costTime) {
  const method = ctx.method;
  const url = ctx.url;
  const body = ctx.request.body;
  const response = ctx.response;
  return { method, url, body, response, costTime };
}

module.exports = { formatError, formatRes };
