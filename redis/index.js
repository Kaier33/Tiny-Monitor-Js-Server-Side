const ErrorModel = require("../model/error");
const IORedis = require("ioredis");
const redis = new IORedis("redis://:123456@127.0.0.1:2332");
const processMessage = async (message) => {
  const data = JSON.parse(message[1][1]);
  await ErrorModel.create({
    error_type: data.error_type,
    error_id: data.error_id,
    user_id: data.user_id,
    error_info: data.error_info,
  });
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
