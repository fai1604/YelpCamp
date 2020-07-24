var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

//schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Bekenu", 
//         image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
//         description: "Bekenu is so nice!"
//     },
//     {   
//         name: "Lambir", 
//         image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
//         description: "Lambir is so nice!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New campground added!");
//             console.log(campground);
//         }
//     }
// )


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
            res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new.ejs");
});

// SHOW - shows more info abt one campground
app.get("/campgrounds/:id", function(req, res){
    // find campground w provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
    // render show template w that campground
    // res.render("show");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});