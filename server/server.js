require('dotenv').config();

// Packages
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
// Routers
const api = require(path.resolve( __dirname, "./api.js"));

/*----- Config -----*/
// Server Setup
const app = express();
app.use(bodyParser.json());

// Environment Variables
const PORT = process.env['PORT'];

// Folder Access
app.use(express.static(__dirname + '/app'));

/*----- Passport Setup -----*/
// Strategy
passport.use(new GoogleStrategy(
    options = {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/oauth2/redirect/google',
      scope: [ 'profile' ]
    }, 
    verify = (issuer, profile, cb) => {
        cb(null, profile.id);
    }
));

// User Data Handling 
// NOTE: Data is passed from || verify callback of strategy | -> | serializeUser | -> | req.user ||
passport.serializeUser((userId, cb) => {
    process.nextTick(() => {
        return cb(null, { id: userId });
    });
});
passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});

// Session Setup
app.use(session({
    secret: 'agent',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.authenticate('session'));

// Gating Middleware
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        next();
    } 
    else {
        res.status(401).send();
    }
}

/*-----  Routes -----*/
// Authentication
app.get('/login', passport.authenticate('google'));
app.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// Database API
app.use(ensureAuthenticated, api);

// Default
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(PORT);