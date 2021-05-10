const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users');

passport.serializeUser((user, done) => { // same as the user which we retrived
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
                //! User does have a record with profile ID
                done(null, existingUser)
            } else {
                //* dont have any account 
                new User({ googleId: profile.id })
                    .save() //* sas because we are required a instance for creating a collention ,and we need to call save() to autometically save the data for use
                    .then(user => done(null, user));
            }

        })


    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback'
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }).then((existingUser) => {
            if (existingUser) {
                //! User does have a record with profile ID
                done(null, existingUser)
            } else {
                //* dont have any account 
                new User({ facebookId: profile.id })
                    .save() //* sas because we are required a instance for creating a collention ,and we need to call save() to autometically save the data for use
                    .then(user => done(null, user));
            }

        })


    })
);
