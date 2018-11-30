const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const PostSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    subreddit: { type: String, required: true },
    author : { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
    upVotes: [{type: Schema.Types.ObjectId, ref: "User"}],
    downVotes: [{ type: Schema.Types.ObjectId, ref: "User"}],
    voteScores: { type: Number, default: 0}

});

PostSchema.pre("save", function(next) {
    const month = new Date().getMonth() + 1;
    const day = new date().getDate();
    const year = new Date().getFullYear();
    const now = `${month}/${day}/${year}`
    this.createdAt = now;
    next()
});

module.exports = mongoose.model("Post", PostSchema);
