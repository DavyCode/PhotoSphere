var mongoose = require("mongoose");

// Campground  schema
var PhotoSpereSchema = mongoose.Schema({
    image:{
        type: String
    },
    caption:{
        type: String
    },
    // author: {
    //     id:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username : String
    // }
    // ,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Gallery", PhotoSpereSchema);