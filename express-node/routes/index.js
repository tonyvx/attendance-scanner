var express = require("express");

const fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get(
  ["/", "/maundy-thursday", "/good-friday", "/easter-vigil"],
  function (req, res, next) {
    res.writeHead(200, { "content-type": "text/html" });
    fs.createReadStream("public/index.html").pipe(res);
  }
);

module.exports = router;
