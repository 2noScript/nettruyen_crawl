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
        timeout: 10000,
        proxy: {
          host: "2606:4700:10::ac43:1f44",
          port: 80,
          // auth: { username: "my-user", password: "my-password" },
        },
      });
      return response.data.pipe(res);
    } catch (err) {
      res.json({ err });
    }
  }
}
module.exports = new Proxy();
