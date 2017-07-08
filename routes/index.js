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
            console.log(err.message);
             return res.render('users/register');
        }
        // middleware authenticate and log user in
        passport.authenticate('local')(req, res, () => {
            res.redirect('home');
            console.log("user registered!!!")
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
    res.redirect('/home');
    console.log("logged you out!!!")
})


module.exports = router;
