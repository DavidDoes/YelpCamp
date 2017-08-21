var mongoose = require("mongoose");

//COMMENT SCHEMA - text, author
var commentSchema = mongoose.Schema({
    text: String,
    author: { //retrieves author's name
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);