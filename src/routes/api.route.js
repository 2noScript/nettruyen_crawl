const router = require("express").Router();
const api = require("../api");
router.get("/suggest", api.suggest);
router.get("/detail", api.detail);
module.exports = router;
