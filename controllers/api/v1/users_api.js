const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


//get login data session creation - by using jsonwebtoken - to run ocde below we need a route
module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!User || user.password != req.body.password){
            return res.status(422).json({
                message:"Invalid Username or password!"
            });
        }

        return res.status(200).json({
            message:"Sign in succcessful!",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'}) //digits for expiring token = in miliseconds
            }
        });
        
    }catch(err){
        console.log('****err',err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}