const crawl = require("../crawl");

class Api {
  constructor() {}

  async newUpdate(req, res, next) {
    const data = await crawl.newUpdate(req.query);
    await res.json(data);
  }
  async hot(req, res, next) {
    const data = await crawl.hot(req.query);
    await res.json(data);
  }
  async filter(req, res, next) {
    const data = await crawl.filter(req.query);
    await res.json(data);
  }
  async detail(req, res, next) {
    const data = await crawl.detail(req.query);
    await res.send(data);
  }
  async chapter(req, res, next) {
    const data = await crawl.chapter(req.query);
    await res.json(data);
  }
}

module.exports = new Api();
