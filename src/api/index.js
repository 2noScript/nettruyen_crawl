const crawl = require("../crawl");

console.log(crawl.suggest());
class Api {
  constructor() {}

  async suggest(req, res, next) {
    const data = await crawl.suggest();
    await res.json(data);
  }
  async detail(req, res, next) {
    const data = await crawl.detail(req.query.key);
    await res.send(data);
  }
}

module.exports = new Api();
