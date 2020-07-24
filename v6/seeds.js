var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var seeds = [
    {
        name: "Bekenu", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        name: "Bekenu 2", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        name: "Bekenu 3", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        name: "Bekenu 4", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        name: "Bekenu 5", 
        image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
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