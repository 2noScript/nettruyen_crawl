const axios = require("axios").default;
require("dotenv").config();

const instance = axios.create({
  baseURL: process.env.WEB_CRAWL,
  headers: {
    referer: process.env.WEB_CRAWL,
    origin: process.env.WEB_CRAWL,
  },
  timeout: 10000,
});

module.exports = {
  instance,
};
