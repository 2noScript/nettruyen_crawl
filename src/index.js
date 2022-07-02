const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const route = require("./routes");
//config
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
