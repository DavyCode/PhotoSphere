var mongoose = require("mongoose");

// Campground  schema
var commentSchema = mongoose.Schema({
    text:{
        type: String
    },
    author:{
        type: String
    }
    // author: {
    //     id:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username : String
    // }
    // ,
    // comment: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment"
    // }]
});

module.exports = mongoose.model("Comment", commentSchema);