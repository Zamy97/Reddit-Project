module.exports = function(app) {
    const Comment = require('../models/comment')
    // CREATE comments
    app.post("/posts/:postId/comments", function(req, res){
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);

        // SAVE INSTANCE of comment MODEL to DB
        comment
            .save()
            .then(comment => {
                // REDIRECT TO THE ROOT
                return res.redirect('/posts');
            })
            .catch(err => {
                console.log(err);
            });
        });
};
