const { instance } = require("../request");
const { parse } = require("node-html-parser");
const { ROOT, ROOT_MANGA } = require("../configs");
class Crawl {
  replaceKey = {
    text: "http://www.nettruyenco.com/truyen-tranh/",
    re: "",
  };
  constructor() {}
  async suggest() {
    const { data } = await instance.get(ROOT);
    const htmlRaw = parse(data);
    const root = htmlRaw.querySelectorAll(`.items-slide .item`);
    let jsonData = [];
    root.forEach((item) => {
      const a = item.querySelector("a");
      const img = item.querySelector("img");
      const xb = [
        {
          key: a
            .getAttribute("href")
            .replace(this.replaceKey.text, this.replaceKey.re),
          avatar: img.getAttribute("src"),
          name: img.getAttribute("alt"),
        },
      ];
      jsonData = [...jsonData, ...xb];
      // console.log(a.attributes);
    });
    return jsonData;
  }

  async detail(key) {
    console.log(key);
    try {
      const { data } = await instance.get(`${ROOT_MANGA}${key}`);
      console.log("x");
      return data;
    } catch (err) {
      console.log("error");
    }
  }
}

module.exports = new Crawl();
