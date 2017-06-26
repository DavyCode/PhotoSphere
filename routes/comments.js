var express = require('express'),
     router = express.Router({ mergeParams: true }),
    // router = express.Router(),
    Gallery = require("../models/home"),
    Comment = require("../models/comment");
    // middleware = require('../middleware');

//CREATE NEW COMMENT
router.get('/new', (req, res) => {
   Gallery.findById(req.params.id, (err, foundPost) => {
     console.log(foundPost +"the found post here");
        (err) ? console.log(err): res.render("comments/new", { foundPost: foundPost });
    });
});    

module.exports = router;