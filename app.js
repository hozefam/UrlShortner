//requirements
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get("/new/:urlToShorten(*)", (req, res, next) => {
  var { urlToShorten } = req.params;
  return res.json({ urlToShorten });
});

//listen
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at 3000 ... ");
});
