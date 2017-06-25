var mongoose = require("mongoose");
var Gallery = require('./models/home');



function seedDB(){
    Gallery.remove({}, (err) => {
    if(err){
      console.log(err);
    }
    console.log("removed all post!!!!");
});

}



module.exports = seedDB;