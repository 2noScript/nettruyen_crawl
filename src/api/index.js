const crawl = require("../crawl");

class Api {
  constructor() {}

  //  new-update?page=...
  async newUpdate(req, res, next) {
    const data = await crawl.newUpdate(req.query);
    await res.json(data);
  }
  // hot?page=..
  async hot(req, res, next) {
    const data = await crawl.hot(req.query);
    await res.json(data);
  }
  /**
   *
   * sort 0->3
   * status 0->2
   * genres 0->54
   * !import sort status genres!=null
   */
  async filter(req, res, next) {
    const data = await crawl.filter(req.query);
    await res.json(data);
  }
  async keyWord(req, res, next) {
    const data = await crawl.keyWord(req.query);
    await res.json(data);
  }
  // detail?keymang=...

  async detail(req, res, next) {
    const data = await crawl.detail(req.query);
    await res.json(data);
  }
  //chapter?keychapter
  async chapter(req, res, next) {
    const data = await crawl.chapter(req.query);
    await res.json(data);
  }
}

module.exports = new Api();
