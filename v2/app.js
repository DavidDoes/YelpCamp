var express     = require("express");
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    

mongoose.connect("mongodb://localhost/yelp_camp_v2");
app.use(bodyParser.urlencoded({extended: true})); //this is common line; copy/paste to new apps
app.set("view engine", "ejs");

// --- SCHEMA SETUP ---
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){ //shows all campgrounds
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds: allcampgrounds}); //name: data
        }
    });
    
    // res.render("campgrounds",{campgrounds: campgrounds}); //name: data
});

// Campground.create(
//     {
//       name: "Granite Falls", 
//       image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
//       description: "These are Falls that drop off of granite rocks. Cool, huh?"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND:");
//             console.log(campground);
//         }
// });

//CREATE - add new campgrounds to db
app.post("/campgrounds", function(req, res){ //making new campground
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
app.get("/campgrounds/new", function(req, res){ //page with form
   res.render("new.ejs"); 
});

//SHOW - show info about campground; :id url's must be coded last
app.get("/campgrounds/:id", function(req, res){
    //find campground w/ provided ID; retrieves from auto-assign by mongo
    Campground.findById(req.params.id,function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
        //render show template w/ that campground
        res.render("show", {campground: foundCampground});

       }
    });
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started.");
});

