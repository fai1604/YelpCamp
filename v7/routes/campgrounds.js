var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - show all
router.get("/", function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
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
            res.redirect("/campgrounds");
        }
    }) ;
});

// NEW - show form to create new
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info abt one campground
router.get("/:id", function(req, res){
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

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = router;