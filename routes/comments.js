var express = require('express'),
     router = express.Router({ mergeParams: true }),
    Gallery = require("../models/home"),
    Comment = require("../models/comment"),
    middleware = require('../middleware');


// NEW COMMENT
router.get('/new', middleware.isLoggedIn, (req, res) => {
   Gallery.findById(req.params.id, (err, foundPost) => {
        (err) ? console.log(err): res.render("comments/new", { foundPost: foundPost });
    });
});   


// Comment Create
router.post('/', middleware.isLoggedIn, (req, res) => {
     //lookup campground using ID
    Gallery.findById(req.params.id, (err, foundPost) => {
        if (err) {
            console.log(err);
            res.redirect("home/home");
        } else {
            var text = req.body.comment;
             const newComment ={
                        text: req.body.comment,
                        author : {
                        id: req.user._id,
                        username: req.user.username
                    },
                        createdAt: Date.now()
                    }
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
                    foundPost.comments.push(comment);
                    foundPost.save();
                    // req.flash("success", "Successfully Added Comment");
                    res.redirect("/home/" + foundPost._id);
                }
            })
        }
    });
})




//Edit post
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Gallery.findById(req.params.comment_id, (err, commentFound) => {
        if(err){
            console.log(err.message);
        }
        res.render('comment/edit', {comment : commentFound, post_id: req.params.id})
    })
})
//Update post
router.put('/:id', middleware.checkPostOwnership, (req, res) => {
     const editedPost = {
         image : req.body.image,
         caption : req.body.caption
     }
     Gallery.findByIdAndUpdate(req.params.id, editedPost, (err, updatedPost) => {
         if(err) {
             console.log(err.message)
             res.redirect('/home')
         }
         res.redirect('/home/' + req.params.id);
     } )
})

//Delete post
router.delete('/:id', middleware.checkPostOwnership, (req, res) => {
    Gallery.findByIdAndRemove( req.params.id, (err) => {
        if(err){
            res.redirect('/home')
        }
        res.redirect('/home')
    })
})



module.exports = router;