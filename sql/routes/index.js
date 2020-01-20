  
var express = require('express');
var User = require('../models').User ;
var Comment = require('../models').Comment ;

var router = express.Router();

router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      res.render('sequelize', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });

    Comment.findAll()
    .then((comments) => {
      res.render('sequelize', { comments });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });



});

module.exports = router;