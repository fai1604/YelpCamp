var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campgrounds");
    Comment     = require("./models/comment");
    seedDB      = require("./seeds");

// seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all
app.get("/index", function(req, res){
    //get all from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //create new and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/index");
        }
    }) ;
});

// NEW - show form to create new
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info abt one campground
app.get("/campgrounds/:id", function(req, res){
    // find campground w provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    // render show template w that campground
    // res.render("show");
});

// ======================
// Comments routes
// ======================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id, sedn when render
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res) {
    // lookup campgrounds using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err)
                } else {
                    // associate comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect campground show page
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});