var express = require('express');
var router = express.Router();
var fs = require('fs');

var indexhtml;

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!indexhtml) {
    indexhtml = fs.readFileSync('uiapp/build/index.html');
  }

  res.send(indexhtml.toString());
});

module.exports = router;
