const axios = require("axios").default;
require("dotenv").config();

const instance = axios.create({
  baseURL: process.env.WEB_CRAWL,
});

module.exports = {
  instance,
};
