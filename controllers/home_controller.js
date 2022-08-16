const Post = require('../models/post');

module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for codeial</h1>');
    // console.log(req.cookies);// will print cookies written in inpect--application -storage --cokies
    // res.cookie('',18); // explicity cookie value changed -- will reflect in inspect-applciation-cookie
    // return res.render('home',{
    //     title:"Home"
    // });

    // posts/comment in db

    Post.find({},function(err,posts){
        return res.render('home',{
            title:"Codeial | Home",
            posts
        });
    });

};