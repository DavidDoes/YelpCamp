var mongoose    = require("mongoose");
    Campground  = require("./models/campground");
    Comment     = require("./models/comment");
    
var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg",
        description: "Relax after a day's long hike."
    },
    {
        name: "Widow's Peak",
        image: "https://farm1.staticflickr.com/649/32262472514_b6c653e249.jpg",
        description: "If you can make it to this site before sunset, you won't be disappointed!"
    },
    {
        name: "Black Lakes",
        image: "https://farm3.staticflickr.com/2882/33983298560_fa545f5160.jpg",
        description: "Due to being unable to see into the waters, these lakes are rumored to be hundreds of feet deep."
    }
]

function seedDB(){
    //remove all campgrounds
        Campground.remove({
            
        }, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //remove existing campgrounds, then
        //add a few campgrounds from array above
        data.forEach(function(seed){ //looping thru each campground above in the array
               Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err);
                   } else {
                       console.log("Added a campground.");
                       //create comment
                       Comment.create(
                           {
                               text: "This place is great!",
                               author: "Homer"
                           }, function(err, comment){
                               if(err){
                                   console.log(err);
                               } else {
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log("Created new comment");
                               }
                           });
                   }
               }) 
            });
        });
}

module.exports = seedDB; 
//sending above function out, to be stored in var seedDB in app.js, 
//executed every time server is started