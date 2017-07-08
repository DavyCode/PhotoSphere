var express = require('express'),
    router = express.Router(),
    Gallery = require("../models/home"),
    Comment = require('../models/comment'),
    middleware = require('../middleware');




//  var photos = [{
//         image: "images/1.jpg",
//         caption : "hey hey feeling fly"
//     },
//     {
//         image: "images/3.jpg",
//         caption : "hey hey feeling fly"
//     },
//     {
//         image: "images/1.jpg",
//         caption : "hey hey feeling fly"
//     },
//     {
//         image: "images/3.jpg",
//         caption : "hey hey feeling fly"
//     }
//     ]; 

// Gallery.create( {
        
//         image: "images/1.jpg",
//         caption : "hahaha dot create did this!!"
    
//     }, (err, newPost) => {
//         if(err){
//             console.log(err);
//         }
//         console.log("new photo posted!!");
//         console.log(newPost);
//     })


//HOME ROUTE
router.get("/", (req, res) => {
  // find and display all camps in database 
   Gallery.find({}, (err, allPost) => {
       if(err){
           console.log(err)
       }
      res.render("home/home", {allPost: allPost});
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



    var photo_url = req.body.image;
    var photo_caption = req.body.caption;
    var newPost ={ image : photo_url, caption: photo_caption }

    Gallery.create(newPost, (err, newlyPosted) => {
        if(err){
            console.log(err.message)
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
        // console.log(foundPost)
        // console.log(foundPost.author)
        // console.log(foundPost.author.username)
            res.render("home/show", { displayPost: foundPost });
    });
});

module.exports = router;