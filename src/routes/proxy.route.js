const router = require("express").Router();
const proxy = require("../proxy");

router.get("/img", proxy.publicURL);
module.exports = router;
