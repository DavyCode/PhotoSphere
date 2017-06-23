var express = require('express'),
    router = express.Router();




 var photos = [{
        image: "images/1.jpg",
        caption : "hey hey feeling fly"
    },
    {
        image: "images/3.jpg",
        caption : "hey hey feeling fly"
    },
    {
        image: "images/1.jpg",
        caption : "hey hey feeling fly"
    },
    {
        image: "images/3.jpg",
        caption : "hey hey feeling fly"
    }
    ]; 

//root route
router.get("/", (req, res) => {

    
    // find and display all camps in data base 

    
    res.render("home", {photo: photos});
    // res.send("sending the home page")
});

router.post( "/", (req, res) => {
    // get data from form add to photos array
    var photo_url = req.body.image;
    var photo_caption = req.body.caption;
    
    var newPhoto ={ image : photo_url, caption: photo_caption }
     photos.push(newPhoto);

    
    //redirect back to photos home page
    res.redirect('/home')
    console.log("new photo added")
});

router.get("/new", (req, res) => {
    // show form for adding new photos
    res.render("new")
})


module.exports = router;