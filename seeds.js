let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

let data = [
    {
        name: "Sunset Beach",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzhWXNE4FP9EZ3m6BsE2ms_sSDdtxc8H_SnBnX7z7DAs4-feS",
        description: "Beautiful lakeside beach",
    },
    {
        name: "Mountain View",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2YUK_iZAuRLDxGJkb-ze_JKxBQHqw92SPGbMtOfqGtXshAeABw",
        description: "Beautiful lakeside beach",
    },
    {
        name: "Sunset Beach",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzhWXNE4FP9EZ3m6BsE2ms_sSDdtxc8H_SnBnX7z7DAs4-feS",
        description: "Beautiful lakeside beach",
    }
];

function seedDB() {
    //Remove ALL campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed Campgrounds");
        //Add a few campground
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added Campground");
                    // Create a comment
                    Comment.create(
                        {
                            text: "This place is great.",
                            author: "Homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comment.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        });
                }
            });
        });
        //Add a few comments
    });
}

module.exports = seedDB;
