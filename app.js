//requirements
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors);

//listen
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at 3000 ... ");
});
