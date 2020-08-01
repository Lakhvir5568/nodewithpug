
var express = require('express');
var router = express.Router();

// Routes

router.get('/', function(req, res, next) {
  res.render('pages/additem.pug', {'page': 'additem'});
});

//Exports

module.exports = router;