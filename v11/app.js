var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// seedDB();
// mongoose.connect("mongodb://localhost:27017/yelp_camp_v11deployed", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/yelp_camp_v11deployed", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://fai:fai160400@cluster0.n5zv5.mongodb.net/yelp_camp_v11deployed?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbUser:<password>@cluster0.n5zv5.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// mongodb+srv://fai:<fai160400>@cluster0.iqudq.mongodb.net/<fai>?retryWrites=true&w=majority
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

// PASSPORT configuration
app.use(require("express-session")({
    secret: "meo is a cutie",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass req.user to every single template
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});