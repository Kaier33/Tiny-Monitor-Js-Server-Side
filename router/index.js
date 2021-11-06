const Router = require("@koa/router");
const CollectFrontendError = require("../controllers/collect-frontend-error");

const router = new Router();

router.post("/report-err", CollectFrontendError.reportErr);
router.get("/report-test", CollectFrontendError.performanceTest);
router.delete('/delete-test', CollectFrontendError.deleteTestData)

module.exports = router;
