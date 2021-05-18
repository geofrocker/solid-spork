const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(
  bodyParser.json({
    type: function() {
      return true;
    },
    limit:44
  })
);

app.use(function(err, req, res, next) {
  if (err.name === "SyntaxError") {
    res.status(500).send({
      error: "An error occurred in the request, Ensure that the request is JSON"
    });
  } else {
    res.status(500).send({
      error: "An error occurred in the request"
    });
  }
});
app.get("/", (req, res) => {
  res.status(200).send({ message: "new response" });
});

module.exports = app;
