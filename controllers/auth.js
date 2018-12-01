const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require("../models/user.js");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    // SIGN UP FORM
    app.get("/sign-up", (req, res) => {
        res.render("sign-up.hbs")
    });

    //LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('Token');
        res.redirect('/')
    });

    //LOGIN FORM
    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.post("/login", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        // Find this user name
        User.findOne({ username }, "username password")
            .then(user => {
                if (!user) {
                    // User not found
                    return res.status(401).send({ message: "Wrong Username or Password"});
                }
                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // PAssword Does not match
                        return res.status(401).send({ message: "Wrong Username or Password" });
                    }
                    //Create a token
                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                    });
                    // SET a cookie and redirect to root
                    res.cookie("Token", token, { maxAge: 90000, httpOnly: true });
                    res.redirect("/");
                });
            })
            .catch(err => {
                console.log(err);
            });
    });



    // SIGN UP POST
    app.post("/sign-up", (req, res) => {
        //Create User
        const user = new User(req.body);

        user.password = user.generateHash(req.body.password);

        user
            .save()
            .then(user => {
                console.log(user);
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
                res.cookie('Token', token, { maxAge: 900000, httpOnly: true });
                return res.redirect("/");
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({ err: err });
            })
        });
};
