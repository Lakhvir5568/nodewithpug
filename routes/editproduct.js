
var express = require('express');
var router = express.Router();

// Routes

router.get('/', function(req, res, next) {
  res.render('pages/editproduct.pug', {'page': 'editproduct'});
});

//Exports

module.exports = router;