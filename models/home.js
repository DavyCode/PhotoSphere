var mongoose = require("mongoose");

// Campground  schema
var PhotoSpereSchema = mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    caption:{
        type: String,
         index: true
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


// // Day Schema
// var daySchema = mongoose.Schema({
//   name:{
//     type: String,
//     required: true,
//   },
//   createdAt:{
//     type: Date,
//     default: Date.now
//   }
// });