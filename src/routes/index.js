const api = require("./api.route");

function route(app) {
  app.get("/", (req, res) => {
    res.send("this is api copyright by 2noscript");
  });

  app.use("/api", api);
}
module.exports = route;
