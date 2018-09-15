//requirements
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const shortUrl = require("./models/shortUrl");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/shortUrls");

app.use(express.static(__dirname + "/public"));

app.get("/new/:urlToShorten(*)", (req, res, next) => {
  var { urlToShorten } = req.params;

  var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  if (regex.test(urlToShorten) === true) {
    var short = Math.floor(Math.random() * 100000).toString();

    var data = new shortUrl({
      originalUrl: urlToShorten,
      shortenUrl: short
    });

    data.save(err => {
      if (err) {
        return res.send("Error saving to database");
      }
    });

    return res.json({ data });
  }

  return res.json({ urlToShorten: "False" });
});

app.get("/:urlToForward", (req, res, next) => {
  var shortenUrl = req.params.urlToForward;
  shortUrl.findOne({ shortenUrl: shortenUrl }, (err, data) => {
    if (err) {
      return res.send("Error reading database");
    }
    console.log(data);
    var re = new RegExp("^(http|https)://", "i");
    var strToCheck = data.originalUrl;

    if (re.test(strToCheck) === true) {
      res.redirect(301, data.originalUrl);
    } else {
      res.redirect(301, "http://" + data.originalUrl);
    }
  });
});

//listen
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at 3000 ... ");
});
