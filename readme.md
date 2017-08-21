#YelpCamp

* Add landing page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image
    [
        {name:"Salmon Creek", image: "https://image.com/"}{etc.}
    ]
 

#setting up:
npm init
npm install express ejs --save

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser ( npm install body-parser --save )
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and config mongoose
* Setup campground model
* Use campground model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
* Add desc to our campground model
* show db.collection.drop()
* Add a show route/template 

#Refactor Mongoose Code
* Create a models directory
* Use module.export
* Require everything correctly!

#Add Seed File
_used to seed info/data to database_
using _error-driven development_ - write some code, get errors, write more code
to get rid of those errors
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment model
* Make our errors go away!
* Display comments on campground show page 

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

_RESTFUL ROUTES_

Name    Path             HTTP Verb   
====================================
Index   /campgrounds            GET         
New     /campgrounds/new        GET         
Create  /campgrounds            POST        
Show    /campgrounds/:id        GET         

##Comments
<!--Dependent on a campground -->
Name    Path                            HTTP Verb
=================================================
NEW     /campgrounds/:id/comments/new   GET
CREATE  /campgrounds/:id/comments       POST


#Style SHOW Page
* Add sidebar to SHOW page
* Display comments nicely

#Auth Part 1 - Add User Model
* Install all packages needed for auth
    - npm init
    - change index.js to app.js
    - touch and open app.js
    - npm install ejs express mongoose passport passport-local passport-local-mongoose body-parser express-session --save
    - check package.json to make sure modules are installed
* Define User model 

#Auth Part 2 - Register
* Config passport 
* Add _/register_ routes 
* Add _register_ template 

#Auth Part 3 - Login
* Add _/login_ routes
* Add _login_ template 

#Auth Part 4 - Logout & Navbar
* Add _/logout_ route 
* Prevent user from adding a comment if not logged in
* Add links to navbar 
* Show/hide auth links correctly 

#Auth Part 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

#Refactor the Routes
* Use Express router to reorganize all routes O.O

#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically 

#Users + Campgrounds
* Prevent an unauthenticated user from creating a campground 
* Save username + id to newly created campground

#Editng Campgrounds
* Add Method-Override
    - npm install method-override --save
    - methodOverride = require("method-override"),
    - app.use(methodOverride("_method"));
* Add _/edit_ route for Campgrounds
    - /campgrounds/:id/edit 
    - GET method
    - router.get("/:id/edit")
* Add link to Edit page
* Add _/update_ route 
    - /campgrounds/:id
    - PUT request
* Fix _$set_ problem

#Deleting Campgrounds
* Add _/destroy_ route
* Add _Delete_ button

#Authorization
diff from Authentication:
_Authentication_ = finding out if someone is who they say they are
_Authorization_ = permissions; once you know who they are, what are they
allowed to do?
* User can only edit his/her campground
    if(foundCampground.author.id.equals(req.user._id)){
    _must use this instead of === to compare user id to foundCampground's_
    _author id, because cannot compare mongoose object to String_
* User can only delete his/her campgrounds
* Hide/Show Edit and Delete buttons

#Ediing Comments
* Add _/edit_ route for comments 
* Add _Edit_ button 
* Add _/update_ route for comments

#Deleting Comments 
* Add _/destroy_ route 
* Add _Delete_ button 

#Authorization Part 2 - Comments 
* User can only edit his/her comments 
* User can only delete his/her comments 
* Hide/Show edit and delete buttons
    _Change #delete-form to .delete-form_
    Can only use CSS ID once per HTML document
* Refactor _Middleware_

#Adding in Flash!
* Demo working version
* Install and config _connect-flash_
    - `npm install connect-flash --save`
* Add _bootstrap_ alerts to header

#v12 Landing Page Refactor w/ Ian - Background Slider
* Replace _landing.ejs_ code w/ Ian's code 
    - _Modernizr_ - adds classes to our code if browser is older, 
                    allowing CSS to attach itself to that, creating
                    a more cross-platform compatible page
* _Nodemon_ - in place of `node app.js`; checks files for any changes,
            restarts server for you if detects changes
    - `npm install -g nodemon` (`-g` = global)
* _Z-Index_ in CSS = Z position (forward/backward); 1 = coming forward, 
                layers on top of anything with <1 Z-Index 
* _40vh_ in CSS = 40 View Height; centered height

