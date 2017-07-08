var express = require('express'),
     router = express.Router({ mergeParams: true }),
    Gallery = require("../models/home"),
    Comment = require("../models/comment"),
    middleware = require('../middleware');
    // middleware = require('../middleware');

// NEW COMMENT
router.get('/new', middleware.isLoggedIn, (req, res) => {
   Gallery.findById(req.params.id, (err, foundPost) => {
        (err) ? console.log(err): res.render("comments/new", { foundPost: foundPost });
    });
});   



router.post('/', middleware.isLoggedIn, (req, res) => {
     //lookup campground using ID
    Gallery.findById(req.params.id, (err, foundPost) => {
        if (err) {
            console.log(err);
            res.redirect("home/home");
        } else {
            var text = req.body.comment;
            var author = req.body.author;
          var newComment = { text: text, author: author };
            Comment.create(newComment, (err, comment) => {
                if (err) {
                    // req.flash("error", "Something Went Wrong");
                    console.log(err);
                } else {
                    //add username and id to comment
                    // comment.author.id = req.user._id;
                    // comment.author.username = req.user.username;

                    //save comment
                    comment.save();
                    console.log(comment +"the comment body")
                    foundPost.comments.push(comment);
                    foundPost.save();
                    // req.flash("success", "Successfully Added Comment");
                    res.redirect("/home/" + foundPost._id);
                }
            })
        }
    });
})



module.exports = router;