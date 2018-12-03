const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000
const postsController = require('./controllers/posts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post')
const commentsController = require('./controllers/comments.js');
const authController = require('./controllers/auth.js');
const bcrypt = require('bcrypt');


// initiates express
const app = express()

// Cookie Parser set up
app.use(cookieParser());

mongoose.promise = global.promise

// Checking Authentication middleware
const checkAuth = (req, res, next) => {
    console.log("Checking user's Authentication");
    if (typeof req.cookies.Token === "undefined" || res.cookies.Token === null) {
        res.user = null;
    } else {
        const token = req.cookies.Token;
        const decodedToken = jwt.decode(token, { complete: true}) || {};
        req.user = decodedToken.payload;
    }
    next();
}
app.use(checkAuth);

app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//initializing the controllers
postsController(app);
commentsController(app);
authController(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

module.exports = app;



// const express = require('express');
// const exphbs = require('express-handlebars');
// const posts = require('./controllers/posts.js');
// const comments = require('./controllers/comments-controller.js')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const auth = require('./controllers/auth.js')
// const env = require('dotenv').config();
//
// // Set db
// var database = require('./data/reddit-db');
// const Post = require('./models/post')
//
// // express initialize
// var app = express()
//
// const checkAuth = (req, res, next) => {
//     console.log("Checking Authentication");
//     if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
//         res.user = null;
//     } else {
//         var token = req.cookies.nToekn;
//         var decodedToken = jwt.decode(token, { complete: true}) || {};
//         req.user = decodedToken.payload;
//     }
//     next();
// };
//
// app.use(checkAuth);
//
// // cookieParser middleware
// app.use(cookieParser());
//
//
// // create application/json parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(expressValidator());
//
//
// // handlebars middleware here
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');
//
//
// // Home route
// app.get('/', function(req, res) {
//     var currentUser = req.user;
//
//     Post.find({})
//         .then(posts => {
//             res.render("all-posts", { posts, currentUser });
//         })
//         .catch(err => {
//             console.log(err.message);
//         });
//     res.render('home')
// });
//
// // Create a new post route
// app.get('/posts/new', function(req, res) {
//     res.render('posts-new')
// });
//
// // Don't know what these are doing here
// posts(app)
// comments(app)
// auth(app)
//
// // All posts route here
// app.get('/posts', function(req, res){
//     if (req.user) {
//         var post = new Post(req.body);
//
//         post.save(function(err, post) {
//             return res.redirect('/')
//         });
//     } else {
//         return res.status(401); // UNAUTHORIZEd
//     }
// });
//     Post.find({})
//   .then(posts => {
//     res.render("all-posts", { posts });
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
//     // res.render('all_posts')
//
// // SUBREDDIT
// app.get("/n/:subreddit", function(req, res) {
//     Post.find({ subreddit: req.params.subreddit })
//     .then(posts => {
//         res.render("all-posts", { posts });
//     })
//     .catch(err => {
//         console.log(err);
//     });
//     console.log(req.params.subreddit);
// });
//
//
// app.listen(3000);

// Links I have Looked at
// https://stackoverflow.com/questions/51862570/mongoose-why-we-make-mongoose-promise-global-promise-when-setting-a-mongoo
// https://stackoverflow.com/questions/40719525/redirect-to-another-page-nodejs
// https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected?noredirect=1&lq=1
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
// https://www.sitepoint.com/hierarchical-data-database-2/
// https://stackoverflow.com/questions/13066532/how-to-uninstall-npm-modules-in-node-js
