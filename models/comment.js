let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.ObjectId,
            //below User is the user model id
            ref: "User"
        } ,
        username: String,
    }
});

module.exports = mongoose.model("Comment", commentSchema);