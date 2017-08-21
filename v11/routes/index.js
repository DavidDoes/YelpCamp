var express = require("express");
var router = express.Router(); //router was undefined. then replace all 'app' with 'router'
var passport = require("passport"); //passport was not defined
var User = require("../models/user"); //User was not defined

//ROOT route
router.get("/", function(req, res){
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp ' + user.username + '!');
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handle login logic
//router.post("/login", middleware, callback);
router.post("/login", passport.authenticate("local", //calls authenticate onto local strategy
    { //middleware = passport.authenticate method down thru line 56
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){ //don't neccessarily need this empty callback, but just for clarification 
});

//logout route
router.get("/logout", function(req, res){
    req.logout(); //comes with packages we have installed
    req.flash('success', 'You have been logged out.');
    res.redirect("/campgrounds");
});

module.exports = router;