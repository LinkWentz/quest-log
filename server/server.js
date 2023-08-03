require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

const app = express();

passport.use(new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/oauth2/redirect/google',
      scope: [ 'profile' ]
    }, 
    (issuer, profile, cb) => {
        cb(null, profile.id);
    }
));

passport.serializeUser(function(userId, cb) {
    process.nextTick(function() {
      cb(null, { id: userId });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

app.use(session({
    secret: 'agent',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.authenticate('session'));

app.use(express.static(__dirname + '/app'));

app.get('/login', passport.authenticate('google'));
app.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(3000);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        next();
    } 
    else {
        res.redirect('/login');
    }
}