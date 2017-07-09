var  Gallery = require("../models/home"),
    Comment = require('../models/comment');

// All middleware
var middlewareObj = {};


//login middleware
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

//Check post ownership middleware
middlewareObj.checkPostOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
       Gallery.findById(req.params.id, (err, foundPost) => {
         if(err){
             res.redirect('back')
         }else{
             //does user own the campground?
             if(foundPost.author.id.equals(req.user._id)) {
                 next();

             }else{
                 res.redirect('back');
             }
         }
       })
    }else {
       res.redirect('back');
    }
}

// check comment ownership
middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
       Comment.findById(req.params.comment_id, (err, foundComment) => {
         if(err){
             res.redirect('back')
         }else{
             //does user own the campground?
             if(foundComment.author.id.equals(req.user._id)) {
                 next();

             }else{
                 res.redirect('back');
             }
         }
       })
    }else {
       res.redirect('back');
    }
}

module.exports = middlewareObj;