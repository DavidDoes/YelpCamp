var express         = require("express");
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local")
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true})); //this is common line; copy/paste to new apps
app.set("view engine", "ejs");
//seed db every time the server is started
app.use(express.static(__dirname + "/public")); //tells app to use public directory
seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Roxy is the best and worst kitty.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //User.authenticate comes with passport
passport.serializeUser(User.serializeUser()); //ditto
passport.deserializeUser(User.deserializeUser());

//pass `currentUser: req.user` to all ROUTES 
//checks for user's current state of isLoggedIn 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){ //shows all campgrounds
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: allCampgrounds}); //name: data
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); //name of the template - new.ejs
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

//===========
//AUTH ROUTES
//===========

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//show login form
app.get("/login", function(req, res){
    res.render("login");
});

//handle login logic
//app.post("/login", middleware, callback);
app.post("/login", passport.authenticate("local", //calls authenticate onto local strategy
    { //middleware = passport.authenticate method down thru line 56
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){ //don't neccessarily need this empty callback, but just for clarification 
});

//logout route
app.get("/logout", function(req, res){
    req.logout(); //comes with packages we have installed
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){ //next = function called _after_ this middleware; in this case, new comment submission route
    if(req.isAuthenticated()){
        return next(); //if isAuthenticated is true, move on to next thing
    } //otherwise, redirect to /login
    res.redirect('/login');
} //added isLoggedIn, to comments/new route on line 90; checks if logged in. 
//also added to line 101 to protect new comment POST route so that user could not manually navigate to post new comment

//app.listen must be at bottom
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started.");
});

