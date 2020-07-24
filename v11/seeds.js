var mongoose = require("mongoose");
var Campground = require("./models/campground");
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

// function seedDB(){
//     //Remove all campgrounds
//     Campground.remove({}, function(err){
//          if(err){
//              console.log(err);
//          }
//          console.log("removed campgrounds!");
//           //add a few campgrounds
//          data.forEach(function(seed){
//              Campground.create(seed, function(err, campground){
//                  if(err){
//                      console.log(err)
//                  } else {
//                      console.log("added a campground");
//                      //create a comment
//                      Comment.create(
//                          {
//                              text: "This place is great, but I wish there was internet",
//                              author: "Homer"
//                          }, function(err, comment){
//                              if(err){
//                                  console.log(err);
//                              } else {
//                                  campground.comments.push(comment);
//                                  campground.save();
//                                  console.log("Created new comment");
//                              }
//                          });
//                  }
//              });
//          });
//      }); 
//      //add a few comments
//  }
 
module.exports = seedDB;