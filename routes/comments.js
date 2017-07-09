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
             var newComment ={
                        text: req.body.comment
                    //     author : {
                    //     id:  req.user._id,
                    //     username: req.user.username
                    // },
                    //     createdAt: Date.now()
                    }
                Comment.create(newComment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comment
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     comment.createdAt = Date.now();

                    //save comment
                    comment.save();
                    foundPost.comments.push(comment);
                    foundPost.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/home/" + foundPost._id);
                }
            })
        }
    });
})




//Comment edit route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, commentFound) => {
        if(err){
             res.redirect('back');
        }
        console.log(req.params.id);
        console.log(req.params.comment_id)
        console.log(commentFound)
        res.render('comments/edit', { post_id: req.params.id, comment : commentFound})
    })
})


//Comment Update route
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
         if(err) {
             res.redirect('back')
         }
         console.log(req.params.comment_id)
         console.log(req.params.id);
         console.log(req.body.comment);
         req.flash("success", "Ooh Yeah comment updated")
         res.redirect('/home/' + req.params.id);
     } );
});

//Delete comment
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove( req.params.comment_id, (err) => {
        if(err){
            res.redirect('back')
        }
        req.flash("success", "Ooh No comment deleted")
        res.redirect('/home/' + req.params.id)
    });
});



module.exports = router;