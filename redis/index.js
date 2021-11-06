const Redis = require("ioredis");
const ErrorModel = require("../model/error");

const redis = new Redis("redis://:123456@127.0.0.1:6380");
const processMessage = async (message) => {
  // console.log(message)
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

  // Pass the last id of the results to the next round.
  await listenForMessage(messages[messages.length - 1][0]);
}
listenForMessage();


exports.createRedisClient = function () {
  return new Promise((resolve, reject) => {
    const client = new Redis("redis://:123456@127.0.0.1:6380");
    client.connect(() => {
      console.log("Redis connection is successful");
      resolve(client);
    });
  });
};
// const authedRedis = new Redis("redis://:123456@127.0.0.1:6380");

// exports.redisSet = function (key, value) {
//   authedRedis.set(key, value);
// };

// authedRedis.on("error", (err) => {
//   console.error("Redis 连接出错", err);
// });

// authedRedis.on("ready", async () => {
//   console.log("Redis connection is successful");
//   await monitorQueue(authedRedis);
// });

// async function monitorQueue(r) {
//   while (true) {
//     let res = null;
//     try {
//       res = await r.brpop("queue", 60 * 10);
//       console.log("✿✿ヽ(°▽°)ノ✿  ------->", res);
//     } catch (error) {
//       console.log("brpop 出错 💀 ，重新brpop 😑", err);
//       continue;
//     }
//   }
// }

// example
// authedRedis.set("foo", "bar");
// authedRedis.get("foo", function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("result::", result);
//   }
// });

// authedRedis.lpush("my_mq", "001", "002", "003");

// module.exports = authedRedis;
