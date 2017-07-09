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

//Show sign up form
router.get('/register', (req, res) => {
    res.render('users/register');
});

// Handle sign up logic
router.post('/register', (req, res) => {
    var newUser = new User({username : req.body.username});
    User.register( newUser, req.body.password,  (err, user) => {
        if(err){
             req.flash('error', err.message);
             return res.render('users/register');
        }
        // middleware authenticate and log user in
        passport.authenticate('local')(req, res, () => {
            req.flash("success", "Ooh Yeah welcome onboard" + " " + user.username, " begin posting your favorite photos")
            res.redirect('/home');
        });
    })
})

//Show login form
router.get('/login', (req, res) => {
    res.render('users/login');
});

//handle login logic
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/home',
        failureRedirect: '/login'
    }), (req, res) => {
});

//Logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Logged You Out")
    res.redirect('/home');
})


module.exports = router;
