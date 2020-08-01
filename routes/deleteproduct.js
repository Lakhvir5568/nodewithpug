
var express = require('express');
var router = express.Router();

// Routes

router.get('/', function(req, res, next) {
  res.render('pages/deleteproduct.pug', {'page': 'deleteproduct'});
});

//Exports

module.exports = router;