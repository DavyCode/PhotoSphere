var  Gallery = require("../models/home"),
    Comment = require('../models/comment');

// All middleware
var middlewareObj = {};


//login middleware
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please login first!');
    res.redirect('/login');
}

//Check post ownership middleware
middlewareObj.checkPostOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
       Gallery.findById(req.params.id, (err, foundPost) => {
         if(err){
             req.flash("error", "No post Found");
             res.redirect('back')
         }else{
             //does user own the campground?
             if(foundPost.author.id.equals(req.user._id)) {
                 next();

             }else{
                 req.flash("error", "You do not have the permission");
                 res.redirect('back');
             }
         }
       })
    }else {
       req.flash("error", "You need to be logged in"); 
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
                 req.flash("error", "You dont have permission to do that");
                 res.redirect('back');
             }
         }
       })
    }else {
       req.flash("error", 'You must be logged in to edit this post');
       res.redirect('back');
    }
}

module.exports = middlewareObj;