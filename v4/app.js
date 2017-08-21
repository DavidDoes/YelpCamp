var express     = require("express");
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true})); //this is common line; copy/paste to new apps
app.set("view engine", "ejs");
//seed db every time the server is started
seedDB();

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){ //shows all campgrounds
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: allcampgrounds}); //name: data
        }
    });
    
    // res.render("campgrounds",{campgrounds: campgrounds}); //name: data
});


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
   res.render("campgrounds/new"); 
});

//SHOW - show info about campground; :id url's must be coded last
app.get("/campgrounds/:id", function(req, res){
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

//===========================
//COMMENTS ROUTES
//===========================
app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); //name of the template - new.ejs
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground by id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else {    //create new comment
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                //connect new comment to campground
                campground.comments.push(comment);
                campground.save();
                //redirect to campground's SHOW page
                res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });
   
   
   
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started.");
});

