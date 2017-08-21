var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); //this is common line; copy/paste to new apps
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){ //shows all campgrounds
    res.render("campgrounds",{campgrounds: campgrounds}); //name: data
});

 var campgrounds = [
        {name: "Salmon Creek", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Granite Falls", image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Mountain Goat's Rest", image:"https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
         {name: "Salmon Creek", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Granite Falls", image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Mountain Goat's Rest", image:"https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
         {name: "Salmon Creek", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Granite Falls", image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Mountain Goat's Rest", image:"https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"}
    ]

app.post("/campgrounds", function(req, res){ //making new campground
//same as GET route, but this is POST, so it works, but SHOULD be same to keep simple, and is a common format called REST
    // res.send("You hit the post route."); //test w/ Postman
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
//get data from form, add to campgrounds array
    res.redirect("/campgrounds");
//redirect back to campgrounds page
}); 


app.get("/campgrounds/new", function(req, res){ //page with form
   res.render("new.ejs"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started.");
});

