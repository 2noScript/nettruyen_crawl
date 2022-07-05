const axios = require("axios").default;
require("dotenv").config();

class Proxy {
  async publicURL(req, res, next) {
    try {
      const { src } = req.query;
      const response = await axios.get(String(src), {
        responseType: "stream",
        headers: {
          referer: process.env.WEB_CRAWL,
        },
      });
      return response.data.pipe(res);
    } catch (err) {
      res.json({ err });
    }
  }
}
module.exports = new Proxy();
