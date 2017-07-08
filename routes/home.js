var express = require('express'),
    router = express.Router(),
    Gallery = require("../models/home"),
    Comment = require('../models/comment'),
    middleware = require('../middleware');



//HOME ROUTE
router.get("/", (req, res) => {
    console.log(req.user)
  // find and display all camps in database 
   Gallery.find({}, (err, allPost) => {
       if(err){
           console.log(err)
       }
      res.render("home/home", {allPost: allPost, currentUser : req.user});
   }) 
});


//ADD NEW POST ROUTE
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // show form for adding new photos
    res.render("home/new")
})

//CREATE ROUTE
router.post( "/", middleware.isLoggedIn, (req, res) => {
    // get data from form add to photos array
    //check for image field
    // if (req.files.image) {
    //     console.log('Uploading file...');

    //     //File info
    //     var ImageOriginalName = req.files.image.originalname;
    //     var ImageName = req.files.image.name;
    //     var ImageMime = req.files.image.mimetype;
    //     var ImagePath = req.files.image.path;
    //     var ImageExt = req.files.image.extension;
    //     var ImageSize = req.files.image.size;
    // } else {
    //     //Set a Default image
    //     var profileImageName = "noimage.png";
    // }


// ------------------------------------------
    const newPost ={
        image: req.body.image,
        caption: req.body.caption,
        author : {
        id: req.user._id,
        username: req.user.username
    },
        createdAt: Date.now()
    }
    Gallery.create(newPost, (err, newlyPosted) => {
        if(err){
            console.log(err.message);
        }
        //redirect back to photo gallery page
        res.redirect('/home');
    })  
});


//SHOW PAGE
router.get("/:id", function(req, res) {
    //find campground with provided id
    Gallery.findById(req.params.id).populate("comments").exec((err, foundPost) => {
        (err)? console.log(err):
            res.render("home/show", { displayPost: foundPost });
    });
});

//Edit post
router.get('/:id/edit', (req, res) => {
    Gallery.findById(req.params.id, (err, postFound) => {
        if(err){
            console.log(err.message);
        }
        res.render('home/edit', {editPost : postFound})
    })
})
//Update post
router.put('/:id', (req, res) => {
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

module.exports = router;