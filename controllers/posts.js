const Post = require("../models/post.js");
const Comment = require('../models/comment');
const User = require('../models/user')


module.exports = app => {

    app.put("/posts/:id/vote-up", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
            post.upVotes.push(req.params.id);
            post.voteScore = post.voteTotal + 1;
            post.save();

            res.status(200);
        });
    });


    app.put("/posts/:id/vote-down", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteTotal - 1;
            post.save();

            res.status(200);
        });
    });


    // var post = new Post(req.body);
    // post.author = req.user._id;
    //
    // post
    //     .save()
    //     .then(post => {
    //         return User.findById(req.user._id);
    //     })
    //     .then(user => {
    //         user.posts.unshift(post);
    //         user.save();
    //         // REDIRECT TO THE NEW POST
    //         res.redirect("/posts/" + post._id);
    //     })
    //     .catch(err => {
    //         console.log(err.message);
    //     });


    // CREATE
    app.post('/posts', (req, res) => {
        if (req.user) {///initiates instance of Post model
        const post = new Post(req.body);
        console.log('in IF Block -------> ')
        post.author = req.user._id
        //SAVE Post model to db
        post.save((err, post) => {
            return User.findById(req.user._id).then((user) => {
                user.posts.unshift(post);
                console.log('In THEN Block ...');
                user.save();
                //redirect to the post
                res.redirect('/posts/' + post._id)
            }).catch(err => {
                console.log('in CATCH block ...')
                console.log(err.message);
            })
        })
    } else {
        console.log('In ELSE Block ------>');
        return res.status(401).send('You need to be logged in to do that.');

    }
})

    app.get("/posts/:id", function(req, res) {
        //LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
            res.render('show-post', { post })
        }).catch(err => {
            console.log(err.message);
        });
    });
};

// .then(post => {
//     res.render("show_post", { post });
// })
