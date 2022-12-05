const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');




//encryption
let opts = {
    //check from docs also opts options
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial'
}

// passport.use(new JWTStrategy(opts, function(jwtPayload, done){ //done = cb-callback function
        
//         User.findById(jwtPayload._id,function(err,user){
//             if(err){
//                 console.log('Error in fiinding user from jwt');
//                 return;
//             }
//             if(user){ //user found
//                 return done(null.user);
//             }else{
//                 return done(null,false); //user not found
//             }
//         })
//     })
// );

//copied from docs passport-jwt strategy webpage
passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    
    User.findById(jwt_payload._id, function(err, user) {
        if (err) {
            console.log('Error in fiinding user from jwt');
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;
