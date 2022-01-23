const Router = require("@koa/router");
const CollectFrontendError = require("../controllers/collect-frontend-error");
const Users = require("../controllers/users");
const Auth = require("../controllers/auth");
const Analyse = require("../controllers/analyse");

const unprotectedRouter = new Router();
unprotectedRouter.post("/report-err", CollectFrontendError.reportErr);
unprotectedRouter.get("/report-test", CollectFrontendError.performanceTest);
unprotectedRouter.delete("/delete-test", CollectFrontendError.deleteTestData);

unprotectedRouter.post("/monit/api/auth/login", Auth.login);
unprotectedRouter.post("/monit/api/auth/register", Auth.register);

const protectedRouter = new Router({ prefix: "/monit/api" });
protectedRouter.get("/users", Users.listUsers);
protectedRouter.get("/users/:id", Users.userDetail);
protectedRouter.put("/users/:id", Users.updateUser);
protectedRouter.delete("/users/:id", Users.deleteUser);

protectedRouter.get("/analyse/error-list", Analyse.errorList);
protectedRouter.get("/analyse/error/:id", Analyse.errorDetail);

module.exports = { protectedRouter, unprotectedRouter };
