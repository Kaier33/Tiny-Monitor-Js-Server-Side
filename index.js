require('./config/dotenv');
require("./redis");
const https = require("https");
const { readdir } = require("fs").promises;
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

app.on("error", (err, ctx) => {
  errLogger(ctx, err);
});
(async() => {
  try {
    const files = await readdir(__dirname + '/ssl');
    let certFile = null;
    let keyFile = null;
    for (const file of files) {
      if (file.includes('.key')) {
        keyFile = file
      } else if (file.includes('.crt') || file.includes('.pem')) {
        certFile = file
      }
    }
    if (certFile && keyFile) {
      httpsListen(certFile, keyFile)
    } else {
      httpListen()
    }
  } catch (error) {
    console.log('err::', err)
    httpListen()
  }
})()

function httpListen() {
  app.listen(process.env.NODESERVER_PORT || 8233, function () {
    console.log(`http service is running here: http://127.0.0.1:${process.env.NODESERVER_PORT || 8233}`);
  });
}

function httpsListen(certFile, keyFile) {
  https.createServer({cert: certFile, key: keyFile}, app.callback()).listen(process.env.NODESERVER_PORT || 8233, () => {
    console.log(`https service is running here: http://127.0.0.1:${process.env.NODESERVER_PORT || 8233}`);
  });
}
