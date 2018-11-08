const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    createdAt
    title: {type: String, required: true },
    url: {type: String, required: true},
    summary: {type: String, required: true}
});

module.exports = mongoose.model("post", PostSchema);