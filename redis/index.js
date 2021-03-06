const { MYREDIS_PASSWORD, MYREDIS_HOST, MYREDIS_PORT } = process.env
const { serverLogger } = require('../middleware/log4js')
const ErrorModel = require("../model/error");
const IORedis = require("ioredis");
const redis = new IORedis(`redis://:${MYREDIS_PASSWORD}@${MYREDIS_HOST}:${MYREDIS_PORT}`);
const processMessage = async (message) => {
  try {
    const data = JSON.parse(message[1][1]);
    const _hedaer = data.header ? data.header : null
    await ErrorModel.create({
      p_id: data.p_id,
      ip: data.ip,
      header: _hedaer ? JSON.stringify(_hedaer) : '',
      cookie: _hedaer ? _hedaer.cookie : '',
      error_type: data.error_type,
      error_id: data.error_id,
      user_id: data.user_id,
      error_info: JSON.stringify(data.error_info),
      exception_time: data.error_info.timestamp || new Date().getTime(),
      breadcrumb_trail: JSON.stringify(data.breadcrumb_trail)
    });
  } catch (error) {
    console.log('error:', error)
    serverLogger(error)
  }
  // console.log("Id: %s. Data: %O", message[0], message[1]);
};
async function listenForMessage(lastId = "$") {
  const results = await redis.xread("block", 0, "STREAMS", "mystream", lastId);
  const [key, messages] = results[0]; // `key` equals to "mystream"
  messages.forEach(processMessage);
  await listenForMessage(messages[messages.length - 1][0]);
}
listenForMessage();

module.exports = redis;
