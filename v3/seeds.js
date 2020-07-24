var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var seeds = [
    {
        name: "Bekenu", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "Nice!"
    },
    {
        name: "Bekenu 2", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "Nice!"
    },
    {
        name: "Bekenu 3", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "Nice!"
    },
    {
        name: "Bekenu 4", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "Nice!"
    },
    {
        name: "Bekenu 5", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "Nice!"
    }
]

async function seedDB() {
    try {
        //Remove all
        await Comment.remove({});
        console.log("Campgrounds removed!");
        await Campground.remove({});
        console.log("Comments removed!");
        // for every seed inside seeds array
        for(const seed of seeds) {
            let campground = await Campground.create(seed);
            console.log("Campgrounds created!");
            let comment = await Comment.create(
                {
                    text: "This place is nice!",
                    author: "Amimi"
                }
            )
            console.log("Comments created!");
            campground.comments.push(comment);
            campground.save();
            console.log("Comment added to campgrounds!");
        }
    } catch (err) {

    }
}

module.exports = seedDB;