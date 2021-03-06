const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit_project', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { type: String, required: true},
    author : { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Comment", CommentSchema);
