var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
     res.render('index');
});


// ========
// Auth Routes
// ====================

router.get('/register', (req, res) => {
    res.render('users/register');
});

module.exports = router;
