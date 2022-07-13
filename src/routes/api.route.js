const router = require("express").Router();
const api = require("../api");
//  new-update?page=...
router.get("/new-update", api.newUpdate);
// hot?page=..
router.get("/hot", api.hot);
// detail?keymang=...
router.get("/detail", api.detail);
/**
 *
 * sort 0->3
 * status 0->2
 * genres 0->54
 * !import sort status genres!=null
 */
router.get("/filter", api.filter);
router.get("/key-word", api.keyWord);

//chapter?keychapter
router.get("/chapter", api.chapter);
module.exports = router;
