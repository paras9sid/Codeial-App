const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true   // for flash message
    },function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                // console.log('Error finding user--> Passport');

                req.flash('error',err); // for flash messages 
                return done(err);
            }

            if(!user || user.password != password){
                // console.log('Invalid Username/Password!');
                req.flash('error','Invalid username/password'); // for flash messages
                return done(null,false);
            }
                return done(null, user)
        });
    }
));

//serializing and deserializing

//1. serializing the user to decide which key to be kept in cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});


//2. deserializing user from the key in cookies
passport.deserializeUser(function(id , done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error finding user--> Passport');
            return done(err);
        }

        return done(null , user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is sign in pass on to next function
    if(req.isAuthenticated()){
        return next;
    }
    return res.redirect('/users/login');
};

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated){
        //req.user contains the info of current signed in user
        res.locals.user = req.user
    }
    next();
};

module.exports = passport;