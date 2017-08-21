var express = require("express");
var router  = express.Router(); //then replace all `app` with `router`
var Campground = require("../models/campground")

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});
    // res.render("campgrounds",{campgrounds: campgrounds}); //name: data

//CREATE - add new campgrounds to db
router.post("/", function(req, res){ //making new campground
//same as GET route, but this is POST, so it works, but SHOULD be same to keep simple, and is a common format called REST
    // res.send("You hit the post route."); //test w/ Postman
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description
    var newCampground = {name: name, image: image, description: desc};
    // campgrounds.push(newCampground);
    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
                res.redirect("/campgrounds");
        }
    });
//get data from form, add to campgrounds array
}); 

//NEW - show form to create new campground
router.get("/new", function(req, res){ //page with form
   res.render("campgrounds/new"); 
});

//SHOW - show info about campground; :id url's must be coded last
router.get("/:id", function(req, res){
    //find campground w/ provided ID; retrieves from auto-assign by mongo
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    //finding campground by ID, populating "comments" of same ID to that, executing 
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
        //render show template w/ that campground
        res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

module.exports = router;