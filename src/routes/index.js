const api = require("./api.route");
const proxy = require("./proxy.route");
function route(app) {
  app.get("/", (req, res) => {
    res.send("this is api copyright by 2noscript");
  });

  app.use("/api", api);
  app.use("/proxy", proxy);
}
module.exports = route;
