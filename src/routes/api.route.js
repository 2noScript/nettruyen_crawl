const router = require("express").Router();
const api = require("../api");
router.get("/new-update", api.newUpdate);
router.get("/hot", api.hot);
router.get("/detail", api.detail);
router.get("/filter", api.filter);
router.get("/chapter", api.chapter);
module.exports = router;
