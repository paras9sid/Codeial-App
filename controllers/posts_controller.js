const { request } = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user : req.user._id
    }, function(err,post){
            if(err){
                console.log('error in creating a post');
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
        if(post.user == request.user.id){  //
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}