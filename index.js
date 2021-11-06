require("./redis");
const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const router = require("./router");
const { logHandle, errLogger } = require("./middleware/log4js");

const app = new Koa();
app.use(logHandle());
app.use(cors());
app.use(bodyParser({ enableTypes: ["json", "text"] }));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3333, function () {
  console.log("node service is running here: http://127.0.0.1:3333");
});

app.on("error", (err, ctx) => {
  errLogger(ctx, err);
});
