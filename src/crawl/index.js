const { instance } = require("../request");
const { parse } = require("node-html-parser");
const { ROOT, ROOT_MANGA, ROOT_HOT, ROOT_FILTER } = require("../configs");
const { GENRES, SORT, STATUS } = require("../tmp");
require("dotenv").config();
const axios = require("axios").default;
class Crawl {
  replaceKey = {
    text: `${process.env.WEB_CRAWL}${ROOT_MANGA}`,
    re: "",
  };

  constructor() {}

  //crawl
  extraction(data) {
    // console.log(this.replaceKey.text);

    const htmlRaw = parse(data);
    const root = htmlRaw.querySelectorAll("#ctl00_divCenter .items .row .item");
    const pageCount = () => {
      try {
        return htmlRaw.querySelector(".pagination .hidden").text;
      } catch {
        return "1/1";
      }
    };
    let jsonData = [];
    root.forEach((item) => {
      const a = item.querySelector(".image a");
      const img = item.querySelector(".image img");
      const des = item.querySelector(".box_text");
      const listP = item.querySelectorAll(".message_main p");

      const chapter = item.querySelector("ul a").text.replace("Chapter ", "");

      let obj = {};
      listP.forEach((it) => {
        const txt = it.text;
        if (txt.match(/Tình trạng/i)) {
          obj = { ...obj, status: it.lastChild.text };
        }
        if (txt.match(/Thể loại/i)) {
          obj = { ...obj, types: it.lastChild.text };
        }
        if (txt.match(/Ngày cập nhật/i)) {
          obj = { ...obj, update: it.lastChild.text };
        }
      });

      const xb = [
        {
          keyManga: a
            .getAttribute("href")
            .replace(this.replaceKey.text, this.replaceKey.re),
          avatar: img.getAttribute("data-original"),
          name: img.getAttribute("alt").replace("Truyện tranh", "").trimStart(),
          ...obj,
          description: des && des.text,
          chapter,
        },
      ];
      jsonData = [...jsonData, ...xb];
    });
    return {
      pageCount: pageCount(),
      jsonData,
    };
  }
  //  new-update?page=...

  async newUpdate({ page }) {
    // console.log(`${process.env.WEB_CRAWL}${ROOT}?page=${page}`);
    try {
      const { data } = await instance.get(ROOT, {
        params: { page },
      });
      return this.extraction(data);
    } catch {
      return {
        status: 404,
      };
    }
  }
  // hot?page=..

  async hot({ page }) {
    try {
      const { data } = await instance.get(ROOT_HOT, {
        params: {
          page,
        },
      });
      return this.extraction(data);
    } catch {
      return {
        status: 404,
      };
    }
  }

  /**
   *
   * sort 0->3
   * status 0->2
   * genres 0->54
   * !import sort status genres!=null
   */
  async filter({ page, sort, genres, status }) {
    try {
      let path;

      if (genres == 0) path = ROOT_FILTER;
      else {
        path = `${ROOT_FILTER}/${GENRES[genres].slug}`;
      }
      const { data } = await instance.get(path, {
        params: {
          page,
          sort: sort && SORT[sort].count,
          genres,
          status: status && STATUS[status].count,
        },
      });
      return {
        sort: sort && SORT[sort].name,
        status: status && STATUS[status].name,
        genres: genres && GENRES[genres].name,
        ...this.extraction(data),
      };
    } catch {
      return {
        status: 404,
      };
    }
  }

  async keyWord({ kw, page }) {
    try {
      let path = ROOT_FILTER;

      const { data } = await instance.get(path, {
        params: {
          page,
          keyword: kw,
        },
      });
      console.log(data);
      return {
        keyWord: kw ? kw : "",
        ...this.extraction(data),
      };
    } catch {
      return {
        status: 404,
      };
    }
  }
  // detail?keymang=...
  async detail({ keymanga }) {
    try {
      const { data } = await instance.get(`${ROOT_MANGA}/${keymanga}`);
      const htmlRaw = parse(data);
      const listChapter = htmlRaw.querySelectorAll("#nt_listchapter nav li");
      let jsonData = [];
      listChapter.forEach((item) => {
        const a = item.querySelector("a");
        const id = a.getAttribute("data-id");
        const timeUpdate = item.querySelector(".no-wrap.small").text;
        const chapter = a.text.replace("Chapter", "").trim();

        const keyChapter = a
          .getAttribute("href")
          .replace(this.replaceKey.text, this.replaceKey.re);
        jsonData = [...jsonData, { id, timeUpdate, chapter, keyChapter }];
      });
      return jsonData;
    } catch (err) {
      console.log("lỗi");
      return {
        err,
      };
    }
  }
  //chapter?keychapter
  async chapter({ keychapter }) {
    try {
      const { data } = await instance.get(`${ROOT_MANGA}${keychapter}`);
      const protocols = ["http", "https"];
      const htmlRaw = parse(data);
      const pagesRaw = htmlRaw.querySelectorAll(
        ".reading-detail .page-chapter"
      );
      const pages = [...pagesRaw].map((page) => {
        const id = page.querySelector("img")?.getAttribute("data-index");
        const source = page.querySelector("img")?.getAttribute("data-original");
        const srcCDN = page.querySelector("img")?.getAttribute("data-cdn");
        const imgSrc = protocols.some((protocol) => source?.includes(protocol))
          ? source
          : `https:${source}`;
        const imgSrcCDN = protocols.some((protocol) =>
          srcCDN?.includes(protocol)
        )
          ? srcCDN
          : `https:${srcCDN}`;

        return { id, imgSrc, imgSrcCDN };
      });

      return pages;
    } catch (err) {
      console.log("lỗi");
      return {
        err,
      };
    }
  }
}

module.exports = new Crawl();
