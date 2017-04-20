const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require("../data");
const userData = data.users;
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const passHash = require('password-hash');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

function verifyPassword(pass, password) {
    if (passHash.verify(pass, password)) {
        return true;
    }
    return false;
}

function loggedIn(req, res, next) {
    if (req.user) {
       return next();
    } else {
        res.redirect('/');
    }
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    users().then((userCollection) => {
     userCollection.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!verifyPassword(password, user.password)) { return done(null, false); }
      return done(null, user);
    });
  });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    users().then((userCollection) => {
        userCollection.findOne({_id : id}).then((user) => {
                if (!user) throw "User Not Found";
                  done(null,user);
            });
        });
});

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get("/", (req, res) => {
    if (req.user) {
        return res.redirect('/account/' + req.user.username);
    }
    try {
        res.render('account/account', {});
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.get("/:username", (req, res) => {
   if (req.user) {
       if (req.user.username != req.params.username) {
           return res.redirect('/account');
        } else {
            res.render('account/myAccount', {bio: req.user.bio, id: req.user._id});
        }
    } else {
        res.redirect('/account');
    }
});

router.post("/signUp", (req, res) => {
    var postData = req.body;
    var sid = req.sid;
    try {
        userData.newUser(sid, postData.password, postData.username);
        return res.redirect("/account");
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.post("/login", passport.authenticate('local', {successRedirect: '/account',
                                                     failureRedirect: '/account',
                                                     failureFlash: true}));

router.post("/update", (req, res) => {
    var postData = req.body;
    var id = postData.id;
    var newProf = {
        _id : id,
        sessionId : req.sid,
        password : postData.password,
        bio : postData.bio
    };
    try {
        userData.updateProfile(newProf);
        res.redirect("/account");
}
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

module.exports = router;