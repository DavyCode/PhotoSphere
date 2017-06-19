var express = require('express'),
    router = express.Router();
   
//root route
router.get("/", (req, res) => {
    res.render("home");
    // res.send("sending the home page")
});


module.exports = router;