const Post = require("../models/post.js");


module.exports = app => {

    var post = new Post(req.body);
    post.author = req.user._id;

    post

        .save()
        .then(post => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.posts.unshift(post);
            user.save();
            // REDIRECT TO THE NEW POST
            res.redirect("/posts/" + post._id);
        })
        .catch(err => {
            console.log(err.message);
        });
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
        Post.findById(req.params.id).populate('comments').then((post) => {
            res.render('show_post', { post })
        }).catch(err => {
            console.log(err.message);
        });
    });
};

// .then(post => {
//     res.render("show_post", { post });
// })
