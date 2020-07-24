var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Bekenu", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"},
    {name: "Lambir", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"},
    {name: "Pujut Adong", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"}
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
    //default as GET request
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});