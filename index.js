require("./config/projects-blacklist");
require("./config/dotenv");
require("./redis");
const https = require("https");
const { readdir, readFile } = require("fs").promises;
const jwt = require("koa-jwt");
const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const { protectedRouter, unprotectedRouter } = require("./router");
const { logHandle, errLogger } = require("./middleware/log4js");
const catchException = require("./middleware/catch_exception");
const { JWT_SECRET } = require("./config/constants");


const app = new Koa();
app.use(logHandle());
app.use(cors());
app.use(bodyParser({ enableTypes: ["json", "text", "form"] }));
app.use(catchException());
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
app.use(jwt({ secret: JWT_SECRET }));
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

app.on("error", (err, ctx) => {
  errLogger(ctx, err);
});

(async () => {
  try {
    const files = await readdir(__dirname + "/ssl");
    let certFileName = null;
    let keyFileName = null;
    for (const fname of files) {
      if (fname.includes(".key")) {
        keyFileName = fname;
      } else if (fname.includes(".crt") || fname.includes(".cer")) {
        certFileName = fname;
      }
    }
    if (certFileName && keyFileName) {
      httpsListen(certFileName, keyFileName);
    } else {
      httpListen();
    }
  } catch (error) {
    httpListen();
    console.log("err::", error);
  }
})();

function httpListen() {
  app.listen(process.env.NODESERVER_PORT || 8233, function () {
    console.log(
      `http service is running here: http://127.0.0.1:${
        process.env.NODESERVER_PORT || 8233
      }`
    );
  });
}

async function httpsListen(certFileName, keyFileName) {
  const sslOptions = {
    cert: await readFile(__dirname + "/ssl/" + certFileName),
    key: await readFile(__dirname + "/ssl/" + keyFileName),
  };
  https
    .createServer(sslOptions, app.callback())
    .listen(process.env.NODESERVER_PORT || 8233, () => {
      console.log(
        `https service is running here: http://127.0.0.1:${
          process.env.NODESERVER_PORT || 8233
        }`
      );
    });
}
