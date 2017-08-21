var mongoose = require("mongoose");

//COMMENT SCHEMA - text, author
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);