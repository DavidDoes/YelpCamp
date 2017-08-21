var mongoose    = require("mongoose");
    Campground  = require("./models/campground");
    Comment     = require("./models/comment");
    
var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg",
        description: "Kickstarter pickled fashion axe migas VHS cronut keffiyeh waistcoat. Retro wayfarers portland lo-fi. Godard four loko iPhone echo park hoodie tousled bushwick. Selvage poke YOLO, echo park affogato heirloom try-hard iPhone photo booth edison bulb waistcoat. Blog ennui fixie before they sold out helvetica vegan subway tile kombucha keffiyeh freegan taiyaki gochujang master cleanse viral iceland. Taxidermy yr artisan live-edge leggings, vinyl tote bag. Lyft before they sold out vice sustainable PBR&B. Kogi stumptown iPhone fashion axe chicharrones umami. Lyft taxidermy subway tile, skateboard lo-fi master cleanse williamsburg portland ethical whatever tumblr."
    },
    {
        name: "Widow's Peak",
        image: "https://farm1.staticflickr.com/649/32262472514_b6c653e249.jpg",
        description: "Stumptown pitchfork cray VHS gochujang shoreditch crucifix fam vaporware health goth woke fixie live-edge four dollar toast. Direct trade kale chips readymade fixie forage meh. Humblebrag VHS flexitarian heirloom meggings crucifix wolf, XOXO cold-pressed. Hoodie brunch normcore irony. Activated charcoal plaid locavore ramps actually affogato intelligentsia raclette fixie banjo fam cray pop-up. Echo park taxidermy taiyaki, +1 celiac cardigan trust fund food truck four loko vaporware. +1 keytar live-edge, kickstarter activated charcoal air plant meditation leggings sartorial mlkshk. XOXO vegan selfies dreamcatcher scenester 8-bit fanny pack tofu chambray venmo. Whatever XOXO organic chillwave bespoke thundercats. You probably haven't heard of them roof party mlkshk DIY pabst pop-up, pug poutine la croix 90's pitchfork. Pitchfork tumblr austin sartorial tbh, readymade street art pickled pop-up intelligentsia."
    },
    {
        name: "Black Lakes",
        image: "https://farm3.staticflickr.com/2882/33983298560_fa545f5160.jpg",
        description: "Banh mi authentic portland kitsch, roof party iPhone waistcoat pork belly small batch everyday carry. Before they sold out mumblecore meggings hell of succulents retro. Narwhal actually beard yr pitchfork artisan offal photo booth activated charcoal butcher chambray. Asymmetrical crucifix single-origin coffee fanny pack distillery put a bird on it. Tacos gastropub migas four dollar toast YOLO brunch. Ethical whatever vinyl biodiesel. Brooklyn paleo blue bottle, freegan hell of asymmetrical flannel chambray. Woke four dollar toast street art sriracha slow-carb. Bitters pabst truffaut, beard poutine mixtape sriracha portland."
    }
]

function seedDB(){
    //remove all campgrounds
        Campground.remove({}, function(err){
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