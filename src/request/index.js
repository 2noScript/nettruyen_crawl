const axios = require("axios").default;
require("dotenv").config();

const instance = axios.create({
  baseURL: process.env.WEB_CRAWL,
  headers: {
    referer: process.env.WEB_CRAWL,
    origin: process.env.WEB_CRAWL,
    host: process.env.WEB_CRAWL_HOST,
  },
  timeout: 10000,
  proxy: {
    host: "2606:4700:10::6816:4fcf",
    port: 80,
    // auth: { username: "my-user", password: "my-password" },
  },
});

module.exports = {
  instance,
};
