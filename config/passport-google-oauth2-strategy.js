const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto'); //library not cryptocurrency
const User = require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:'987248881753-c4bqnsojvbkntlurg814k7et1tgnt89t.apps.googleusercontent.com', //client id generated from google oauth credentials
        clientSecret:'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', //genrated from google Oauth credentials to check
        callbackURL:'http://localhost:8001/users/auth/google/callback'
    },

    //cb function

    function(accessToeken, refreshToken, profile, done){
        // profile - contains user's information
        //as email has multiple fields and user has mmuliple emails so using array

        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google-strategy-passport',err);
                return;
            }

            console.log(profile);

            if(user){
                //if user found set this user as - req.user
                return done(null,user);
            }else{
                //if user not found - create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes[20].toString('hex')

                }, function(err,user){
                    if(err){
                        console.log('error in creating user google strategy-passport,err');
                        return;
                    }

                    return done(null,user);
                });
            }
        }) 
    }


))