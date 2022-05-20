const Router = require("@koa/router");
const ValidateParamsMiddleware = require('../middleware/validate_params');
const { authSchema, generalSchema, userScheme, projectsSchema } = require("../validator/index");

const CollectFrontendError = require("../controllers/collect-frontend-error");
const Users = require("../controllers/users");
const Auth = require("../controllers/auth");
const Analyse = require("../controllers/analyse");
const Projects = require("../controllers/projects");
const General = require("../controllers/general");

const unprotectedRouter = new Router();
unprotectedRouter.post("/report-err", CollectFrontendError.reportErr);
unprotectedRouter.get("/report-test", CollectFrontendError.performanceTest);
unprotectedRouter.delete("/delete-test", CollectFrontendError.deleteTestData);

unprotectedRouter.post("/monit/api/auth/login", ValidateParamsMiddleware(authSchema.loginSchema), Auth.login);
unprotectedRouter.post("/monit/api/auth/register", ValidateParamsMiddleware(authSchema.registerSchema), Auth.register);

const protectedRouter = new Router({ prefix: "/monit/api" });

protectedRouter.get("/general/projects-blacklist", General.getProjectsBlackList);
protectedRouter.post("/general/projects-blacklist", General.addToProjectsBlackList);
protectedRouter.delete("/general/projects-blacklist/:p_id", General.delFromProjectsBlackList);

protectedRouter.get("/user", Users.userInfo);
protectedRouter.put("/user", ValidateParamsMiddleware(userScheme.updateUserSchema), Users.updateUser);
protectedRouter.get("/users", Users.listUsers);
protectedRouter.get("/users/:id", Users.userDetail);
protectedRouter.delete("/users/:id", Users.deleteUser);
protectedRouter.post("/user/change-password", ValidateParamsMiddleware(userScheme.changePasswordSchema), Users.changePassword);

protectedRouter.get("/project", Projects.list);
protectedRouter.post("/project", ValidateParamsMiddleware(projectsSchema.createProjectSchema), Projects.create);
protectedRouter.put("/project", Projects.update);
protectedRouter.delete("/project/:p_id", Projects.delete);
protectedRouter.post("/project/invite", Projects.invite);
protectedRouter.get("/project/:p_id", Projects.info);

protectedRouter.get("/analyse/error-list", Analyse.errorList);
protectedRouter.get("/analyse/error/:id", Analyse.errorDetail);
protectedRouter.get("/analyse/line-chart-error-list",Analyse.lineChartErrorList)

module.exports = { protectedRouter, unprotectedRouter };
