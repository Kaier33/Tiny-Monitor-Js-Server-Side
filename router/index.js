const Router = require("@koa/router");
const CollectFrontendError = require("../controllers/collect-frontend-error");
const Users = require("../controllers/users");
const Auth = require("../controllers/auth");

const unprotectedRouter = new Router();
unprotectedRouter.post("/report-err", CollectFrontendError.reportErr);
unprotectedRouter.get("/report-test", CollectFrontendError.performanceTest);
unprotectedRouter.delete("/delete-test", CollectFrontendError.deleteTestData);

unprotectedRouter.post("/auth/login", Auth.login);
unprotectedRouter.post("/auth/register", Auth.register);

const protectedRouter = new Router();
protectedRouter.get("/users", Users.listUsers);
protectedRouter.get("/users/:id", Users.userDetail);
protectedRouter.put("/users/:id", Users.updateUser);
protectedRouter.delete("/users/:id", Users.deleteUser);

module.exports = { protectedRouter, unprotectedRouter };
