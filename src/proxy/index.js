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
          origin: process.env.WEB_CRAWL,
          // host: process.env.WEB_CRAWL_HOST,
        },
        // timeout: 10000,
        // proxy: {
        //   host: "2606:4700:10::ac43:1f44",
        //   port: 80,
        // },
      });
      return response.data.pipe(res);
    } catch (err) {
      res.json({ err });
    }
  }
}
module.exports = new Proxy();
