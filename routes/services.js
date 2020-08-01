
var express = require('express');
var router = express.Router();

// Routes

router.get('/', function(req, res, next) {
  res.render('pages/services.pug', {'page': 'services'});
});

//Exports

module.exports = router;