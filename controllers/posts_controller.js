const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({ // action create -- created -- mapped to routes - post.js
        content: req.body.content, // content = name of textarea name(home.ejs file) like input tag box --
        user : req.user._id   
    }, function(err,post){
            if(err){
                console.log('Error in creating a post!!', err);
                return;
            }
            return res.redirect('back');
        });
}

//action for deleting post

module.exports.destroy = function(req ,res){
    
    //finding posts in db
    
    Post.findById(req.params.id , function(err,post){

        //post found
        //.id = conveting the object id into string -> _id converted to .id by mongoose implicitily

        if(post.user == req.user.id){  //
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}