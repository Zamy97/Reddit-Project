var express = require('express');
var exphbs = require('express-handlebars');
var posts = require('./controllers/posts.js');
var comments = require('./controllers/comments-controller.js')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Set db
var database = require('./data/reddit-db');
const Post = require('./models/post')

// express initialize
var app = express()

// cookieParser middleware
app.use(cookieParser());



// create application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());


// handlebars middleware here
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Home route
app.get('/', function(req, res) {
    res.render('home')
});

// Create a new post route
app.get('/posts/new', function(req, res) {
    res.render('posts-new')
});

// Don't know what these are doing here
posts(app)
comments(app)

// All posts route here
app.get('/posts', function(req, res){
    Post.find({})
  .then(posts => {
    res.render("all_posts", { posts });
  })
  .catch(err => {
    console.log(err.message);
  });
    // res.render('all_posts')
});

// SUBREDDIT
app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
        res.render("all_posts", { posts });
    })
    .catch(err => {
        console.log(err);
    });
    console.log(req.params.subreddit);
});


app.listen(3000);

// Links I have Looked at
// https://stackoverflow.com/questions/40719525/redirect-to-another-page-nodejs
// https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected?noredirect=1&lq=1
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
// https://www.sitepoint.com/hierarchical-data-database-2/
// https://stackoverflow.com/questions/13066532/how-to-uninstall-npm-modules-in-node-js
