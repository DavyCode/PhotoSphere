var express = require('express'),
    router = express.Router();
   
//root route
router.get("/", (req, res) => {

    var photos = [{
        author: "Gray Willis",
        image: "images/1.jpg"
    },
    {
        author: "Bray Willis",
        image: "images/3.jpg"
    },
    {
        author: "Gray Willis",
        image: "images/1.jpg"
    },
    {
        author: "Bray Willis",
        image: "images/3.jpg"
    }
    ];
    // find and display all camps in data base 

    
    res.render("home", {photo: photos});
    // res.send("sending the home page")
});

router.post( "/", (req, res) => {
    // get data from form add to photos array
    //redirect back to photos home page
    res.send('hey post hey post')
});

router.get("/new", (req, res) => {
    // show form for adding new photos
    res.render("new")
})


module.exports = router;