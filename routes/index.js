var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
     res.render('index');
});

module.exports = router;
