var mongoose = require("mongoose");
var Gallery = require('./models/home');
var Comment = require('./models/comment');


 var post = [{
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



function seedDB(){
    Gallery.remove({}, (err) => {
//     if(err){
//       console.log(err);
//     }
//     console.log("removed all post!!!!");
    
//     post.forEach( (item) => {
//         Gallery.create(item, (err, newPost) => {
//             if(err){
//                 console.log(err);
//             }
//             console.log("new post posted!!");
//             //Create Comment
//             Comment.create(
//               {
//                  text: "waooooooo!!!! comment finally",
//                  author : "john thomas"
//               }, 
//                 (err, comment) => {
//                  if(err){
//                   console.log(err);
//                  }
//                   newPost.comments.push(comment);
//                   newPost.save();
//                   console.log('New comment added');
//             })
//         });
// });
});
}


module.exports = seedDB;