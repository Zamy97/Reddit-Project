const Post = require("../models/post.js");


module.exports = app => {
    // CREATE
    app.post("/posts/new", (req, res) => {
        //INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        //SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return  res.redirect('/posts');
        })
        console.log(req.body);
    });

    app.get("/posts/:id", function(req, res) {
        //LOOK UP THE POST
        Post.findById(req.params.id)
            .then(post => {
                res.render("show_post", { post });
            })
            .catch(err => {
                console.log(err.message);
        });
    });
};
