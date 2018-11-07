var express = require('express');
var exphbs = require('express-handlebars');


var app = express()

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

// All the posts route
app.get('/posts', function(req, res){
    console.log("hello there")
});

app.listen(3000);
