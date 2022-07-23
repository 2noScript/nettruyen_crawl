const axios = require("axios").default;
require("dotenv").config();

const instance = axios.create({
  baseURL: process.env.WEB_CRAWL,
  headers: {
    referer: process.env.WEB_CRAWL,
    origin: process.env.WEB_CRAWL,
    host: "www.nettruyenme.com",
  },
  timeout: 10000,
  // proxy: {
  //   host: "14.161.31.192",
  //   port: 53281,
  //   // auth: { username: "my-user", password: "my-password" },
  // },
});

module.exports = {
  instance,
};
