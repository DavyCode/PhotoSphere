var  Gallery = require("../models/home"),
    Comment = require('../models/comment');

// All middleware
var middlewareObj = {};


//login middleware
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}



module.exports = middlewareObj;